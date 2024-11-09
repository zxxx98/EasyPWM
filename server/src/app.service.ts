import { Injectable } from '@nestjs/common';
import { IPassword } from './interfaces';
import { IPasswordAPI } from './interfaces';
import { readJSONFile, writeJSONFile } from './utils/json';
import { Config } from './config';
import { SyncController } from './controllers/SyncController';

@Injectable()
export class AppService implements IPasswordAPI
{

  private async getPasswords(): Promise<IPassword[]>
  {
    return await readJSONFile(Config.passwordJsonFileName, []);
  }

  async getAll(userId: string): Promise<IPassword[]>
  {
    const all = await this.getPasswords();
    //返回自己创建的密码和public的密码
    const result = all.filter(p => p.userId === userId || p.visibility === "public");
    return result;
  }

  async add(password: IPassword): Promise<boolean>
  {
    const passwords = await this.getPasswords();
    passwords.push(password);
    const result = await writeJSONFile(Config.passwordJsonFileName, passwords);
    await SyncController.syncToCloud();
    return result;
  }

  async update(password: IPassword): Promise<boolean>
  {
    const passwords = await this.getPasswords();
    const index = passwords.findIndex(p => p.id === password.id);
    if (index === -1) return false;
    passwords[index] = password;
    const result = await writeJSONFile(Config.passwordJsonFileName, passwords);
    await SyncController.syncToCloud();
    return result;
  }

  async updateList(passwordList: IPassword[]): Promise<boolean>
  {
    const result = await writeJSONFile(Config.passwordJsonFileName, passwordList);
    await SyncController.syncToCloud();
    return result;
  }

  async delete(id: string): Promise<boolean>
  {
    const passwords = await this.getPasswords();
    const index = passwords.findIndex(p => p.id === id);
    if (index === -1) return false;
    passwords.splice(index, 1);
    const result = await writeJSONFile(Config.passwordJsonFileName, passwords);
    await SyncController.syncToCloud();
    return result;
  }
}
