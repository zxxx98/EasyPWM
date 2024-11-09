import { Body, Controller, Get, Post } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { CloudflareConfig } from './utils/CloudFlareKV';
import { CloudType, ISyncConfig } from './interfaces';
import { SyncController } from './controllers/SyncController';

@Controller("/cloud")
export class CloudController
{
  constructor(private readonly cloudService: CloudService) { }

  /**
   * 保存配置到云
   * @param config 
   * @returns 
   */
  @Post("/saveConfigToCloud")
  saveConfigToCloud(@Body() config: { cloudConfig: CloudflareConfig, type: CloudType }): Promise<boolean>
  {
    return this.cloudService.saveConfigToCloud(config);
  }

  /**
   * 获取本地配置
   * @returns 
   */
  @Get("/getConfigLocal")
  getConfigLocal(): Promise<ISyncConfig>
  {
    return this.cloudService.getConfigLocal();
  }

  /**
   * 保存本地配置
   * @param config 
   * @returns 
   */
  @Post("/saveConfigLocal")
  async saveConfigLocal(@Body() config: ISyncConfig): Promise<boolean>
  {
    const result = await this.cloudService.saveConfigLocal(config);
    await SyncController.syncToCloud();
    return result;
  }
}
