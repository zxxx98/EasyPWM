import { Config } from "src/config";
import { ISyncConfig, ISystemConfig, IUser } from "src/interfaces";
import { CloudFlareKV } from "src/utils/CloudFlareKV";
import { readJSONFile } from "src/utils/json";

export class SyncController
{
    /**同步到云 */
    static async syncToCloud(): Promise<boolean>
    {
        const syncConfig = await readJSONFile<ISyncConfig>(Config.syncConfigJsonFileName, {
            cloudType: "cloudflare",
            cloudflareConfig: {
                accountId: "",
                apiKey: "",
                namespace: ""
            },
            autoSyncToCloud: false
        });
        if (syncConfig?.autoSyncToCloud) {
            switch (syncConfig.cloudType) {
                case "cloudflare":
                    return await CloudFlareKV.saveConfigToCloud(syncConfig.cloudflareConfig);
            }
        }
        return false;
    }
}
