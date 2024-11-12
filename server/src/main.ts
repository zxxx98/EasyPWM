import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path from 'path';
import os from 'os';
import fs from 'fs';

async function bootstrap()
{
  //如果环境变量里面有RESET字段且值为true，则删除配置文件
  if (process.env.RESET === 'true') {
    const tmpDataDir = path.join(os.tmpdir(), 'easy-password-manager');
    if (fs.existsSync(tmpDataDir)) {
      fs.rmSync(tmpDataDir, { recursive: true, force: true });
    }
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
