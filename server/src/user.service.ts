import { Injectable } from '@nestjs/common';
import { IToken, IUser, IUserAPI } from './interfaces';
import { readJSONFile, writeJSONFile } from './utils/json';
import { Config } from './config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService implements IUserAPI
{

  async getUsers(): Promise<IUser[]>
  {
    return await readJSONFile(Config.userJsonFileName, []);
  }

  async getUser(name: string): Promise<IUser | undefined>
  {
    const users = await this.getUsers();
    return users.find(u => u.name === name);
  }

  async login(name: string, password: string): Promise<IUser | undefined>
  {
    let user = await this.getUser(name);
    user = user?.password === password ? user : undefined;
    if (user) {
      //如果登录成功，则添加一条token
      const token = await uuidv4();
      const now = Date.now();
      //默认一周之后删除
      user.tokens.push({
        token,
        description: 'user login',
        createTime: now,
        deleteTime: now + 7 * 24 * 60 * 60 * 1000
      });
      await this.updateUser(user);
    }
    return user;
  }

  async getUserByToken(token: string): Promise<IUser | undefined>
  {
    const users = await this.getUsers();
    let tokenInfo: IToken | undefined;
    const user = users.find(u =>
    {
      const temp = u.tokens.find(t => t.token === token);
      if (temp) tokenInfo = temp;
      return temp;
    });
    if (user) {
      //如果不在有效期内，则删除
      if (tokenInfo && tokenInfo.deleteTime < Date.now()) {
        //刷新当前tokens
        const newCTokens = user.tokens.filter(t => t.deleteTime > Date.now());
        user.tokens = newCTokens;
        await this.updateUser(user);
        return undefined;
      }
      return user;
    }
    return user;
  }

  async addUser(user: IUser): Promise<boolean>
  {
    const users = await this.getUsers();
    if (users.find(u => u.name === user.name)) return false;
    users.push(user);
    const result = await writeJSONFile(Config.userJsonFileName, users);
    return result;
  }

  async updateUser(user: IUser): Promise<boolean>
  {
    const users = await this.getUsers();
    const index = users.findIndex(p => p.id === user.id);
    if (index === -1) return false;
    users[index] = user;
    return await writeJSONFile(Config.userJsonFileName, users);
  }

  async deleteUser(id: string): Promise<boolean>
  {
    const users = await this.getUsers();
    const index = users.findIndex(p => p.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return await writeJSONFile(Config.userJsonFileName, users);
  }
}
