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

export interface IUser
{
    id: string;
    name: string;
    password: string;
    tokens: IToken[];
    role: Role;
    systemConfig: ISystemConfig;
}

export type Language = "zh" | "en";

export interface IToken
{
    token: string;
    description: string;
    createTime: number;
    deleteTime: number;
}

/**
 * 角色
 */
export type Role = "admin" | "user";

export type CloudType = "google" | "onedrive" | "dropbox" | "cloudflare";

export interface ISystemConfig
{
    language: Language;
}

export interface ISyncConfig
{
    cloudType: CloudType;
    cloudflareConfig: CloudflareConfig;
    autoSyncToCloud: boolean;
}

export type CloudflareConfig = {
    accountId: string;
    apiKey: string;
    namespace: string;
}   
