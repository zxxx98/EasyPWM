import { Injectable } from '@nestjs/common';
import { IPassword } from './interfaces';
import { IDataBase } from './interfaces';
import { readJSONFile, writeJSONFile } from './utils/json';

@Injectable()
export class AppService implements IDataBase
{

  private async getPasswords(): Promise<IPassword[]>
  {
    return await readJSONFile();
  }

  async getAll(): Promise<IPassword[]>
  {
    return this.getPasswords();
  }

  async add(password: IPassword): Promise<boolean>
  {
    const passwords = await this.getPasswords();
    passwords.push(password);
    const result = await writeJSONFile(passwords);
    return result;
  }

  async update(password: IPassword): Promise<boolean>
  {
    const passwords = await this.getPasswords();
    const index = passwords.findIndex(p => p.id === password.id);
    if (index === -1) return false;
    passwords[index] = password;
    return await writeJSONFile(passwords);
  }

  async delete(id: string): Promise<boolean>
  {
    const passwords = await this.getPasswords();
    const index = passwords.findIndex(p => p.id === id);
    if (index === -1) return false;
    passwords.splice(index, 1);
    return await writeJSONFile(passwords);
  }
}
