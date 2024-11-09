import { Injectable } from '@nestjs/common';
import { CloudType, ICloudAPI, IPassword, ISyncConfig, IToken, IUser, IUserAPI } from './interfaces';
import { readJSONFile, writeJSONFile } from './utils/json';
import { Config } from './config';
import { v4 as uuidv4 } from 'uuid';
import { CloudflareConfig } from './utils/CloudFlareKV';
import { CloudFlareKV } from './utils/CloudFlareKV';

@Injectable()
export class CloudService implements ICloudAPI
{
  async cloudflareGet(key: string, config: CloudflareConfig): Promise<string>
  {
    return await CloudFlareKV.get(key, config);
  }

  async cloudflareSet(data: { key: string, value: string }[], config: CloudflareConfig): Promise<boolean>
  {
    return await CloudFlareKV.set(data, config);
  }

  async saveConfigToCloud(config: { cloudConfig: CloudflareConfig, type: CloudType }): Promise<boolean>
  {
    const passwordData = await readJSONFile<IPassword[]>(Config.passwordJsonFileName, []);
    const userData = await readJSONFile<IUser[]>(Config.userJsonFileName, []);
    switch (config.type) {
      case "cloudflare":
        return await this.cloudflareSet([{ key: "password", value: JSON.stringify(passwordData) }, { key: "user", value: JSON.stringify(userData) }], config.cloudConfig);
    }
  }

  async getConfigLocal(): Promise<ISyncConfig>
  {
    return await readJSONFile<ISyncConfig>(Config.syncConfigJsonFileName, {
      cloudType: "cloudflare",
      cloudflareConfig: {
        accountId: "",
        apiKey: "",
        namespace: ""
      },
      autoSyncToCloud: false
    });
  }

  async saveConfigLocal(config: ISyncConfig): Promise<boolean>
  {
    return await writeJSONFile(Config.syncConfigJsonFileName, config);
  }
}
