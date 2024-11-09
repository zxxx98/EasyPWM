import axios from "axios";
import * as dayjs from "dayjs";
import { CloudType, ISyncConfig } from "src/interfaces";
import { IUser } from "src/interfaces";
import { readJSONFile } from "./json";
import { IPassword } from "src/interfaces";
import { Config } from "src/config";

export type CloudflareConfig = {
    accountId: string;
    apiKey: string;
    namespace: string;
}

export class CloudFlareKV
{
    static async get(key: string, config: CloudflareConfig)
    {
        const options = {
            method: 'GET',
            url: `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/storage/kv/namespaces/${config.namespace}/values/${key}`,
            headers: { 'Content-Type': 'application/json', Authorization: config.apiKey }
        };
        const response = await axios.request(options);
        return response.data;
    }

    static async set(data: { key: string, value: string }[], config: CloudflareConfig)
    {
        const options = {
            method: 'PUT',
            url: `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/storage/kv/namespaces/${config.namespace}/bulk`,
            headers: { 'Content-Type': 'application/json', Authorization: config.apiKey },
            data: data.map(item => ({
                base64: false,
                key: item.key,
                metadata: { createTime: dayjs().format("YYYY-MM-DD HH:mm:ss") },
                value: item.value
            })),
        };
        const response = await axios.request(options);
        return response.data.success;
    }

    static async saveConfigToCloud(config: CloudflareConfig): Promise<boolean>
    {
        if (config.accountId === "" || config.apiKey === "" || config.namespace === "") return false;
        const passwordData = await readJSONFile<IPassword[]>(Config.passwordJsonFileName, []);
        const userData = await readJSONFile<IUser[]>(Config.userJsonFileName, []);
        const syncData = await readJSONFile<ISyncConfig>(Config.syncConfigJsonFileName, {
            cloudType: "cloudflare",
            cloudflareConfig: { accountId: "", apiKey: "", namespace: "" },
            autoSyncToCloud: false
        });
        return await CloudFlareKV.set([
            { key: "password", value: JSON.stringify(passwordData) },
            { key: "user", value: JSON.stringify(userData) },
            { key: "sync", value: JSON.stringify(syncData) }
        ], config);
    }
}
