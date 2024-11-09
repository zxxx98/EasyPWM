import { CloudflareConfig } from "src/utils/CloudFlareKV";

export interface IPasswordAPI
{
    getAll(userId: string): Promise<IPassword[]>;
    add(password: IPassword): Promise<boolean>;
    update(password: IPassword): Promise<boolean>;
    updateList(passwordList: IPassword[]): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface IPassword
{
    id: string,
    userId: string,
    userName: string,
    password: string,
    visibility: "public" | "private",
    domain?: string,
    remark?: string,
    config: {
        needUpperCaseAndLowerCase: boolean
        needSpecialChar: boolean
        needNumbers: boolean
        length: number
    }
}

export interface IUserAPI
{
    getUser(name: string): Promise<IUser | undefined>;
    getUsers(): Promise<IUser[]>;
    login(name: string, password: string): Promise<IUser | undefined>;
    getUserByToken(token: string): Promise<IUser | undefined>;
    addUser(user: IUser): Promise<boolean>;
    updateUser(user: IUser): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
}

export interface IUser
{
    id: string;
    name: string;
    password: string;
    tokens: IToken[];
    role: Role;
    systemConfig: ISystemConfig;
    syncConfig: ISyncConfig;
}

export interface ISyncConfig
{
    cloudType: CloudType;
    cloudflareConfig: CloudflareConfig;
    autoSyncToCloud: boolean;
}

export interface IToken
{
    token: string;
    description: string;
    createTime: number;
    deleteTime: number;
}

export type Language = "zh" | "en";

/**
 * 角色
 */
export type Role = "admin" | "user";

export interface ISystemConfig
{
    language: Language;
}


export type CloudType = "google" | "onedrive" | "dropbox" | "cloudflare";

export interface ICloudAPI
{
    cloudflareGet(key: string, config: CloudflareConfig): Promise<string>;
    cloudflareSet(data: { key: string, value: string }[], config: CloudflareConfig): Promise<boolean>;
    saveConfigToCloud(config: { cloudConfig: CloudflareConfig, type: CloudType }): Promise<boolean>;
    getConfigLocal(): Promise<ISyncConfig>;
    saveConfigLocal(config: ISyncConfig): Promise<boolean>;
}
