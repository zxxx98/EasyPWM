import { Injectable } from '@nestjs/common';
import { IUser, IUserAPI } from './interfaces';
import { readJSONFile, writeJSONFile } from './utils/json';
import { Config } from './config';
const nanoid = async (size:number) => {
  const module = await import('nanoid');
  return module.nanoid(size);
};

@Injectable()
export class UserService implements IUserAPI {

  async getUsers(): Promise<IUser[]> {
    return await readJSONFile(Config.userJsonFileName);
  }

  async getUser(name: string): Promise<IUser | undefined> {
    const users = await this.getUsers();
    return users.find(u => u.name === name);
  }

  async login(name: string, password: string): Promise<IUser | undefined> {
    let user = await this.getUser(name);
    user = user?.password === password ? user : undefined;
    if(user)
    {
      //如果登录成功，则添加一条token
      const token = await nanoid(16);
      user.tokens.push(token);
      await this.updateUser(user);
    }
    return user;
  }

  async getUserByToken(token: string): Promise<IUser | undefined> {
    const users = await this.getUsers();
    return users.find(u => u.tokens.find(t => t === token));
  }

  async addUser(user: IUser): Promise<boolean> {
    const users = await this.getUsers();
    if (users.find(u => u.name === user.name)) return false;
    users.push(user);
    const result = await writeJSONFile(Config.userJsonFileName, users);
    return result;
  }

  async updateUser(user: IUser): Promise<boolean> {
    const users = await this.getUsers();
    const index = users.findIndex(p => p.id === user.id);
    if (index === -1) return false;
    users[index] = user;
    return await writeJSONFile(Config.userJsonFileName, users);
  }

  async deleteUser(id: string): Promise<boolean> {
    const users = await this.getUsers();
    const index = users.findIndex(p => p.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return await writeJSONFile(Config.userJsonFileName, users);
  }
}
