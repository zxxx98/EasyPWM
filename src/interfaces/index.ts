export interface IPassword
{
    id: string,
    userName: string,
    password: string,
    visibility : "public" | "private",
    domain?: string,
    remark?: string,
    config: {
        needUpperCaseAndLowerCase: boolean
        needSpecialChar: boolean
        needNumbers: boolean
        length: number
    }
}

export interface IUser {
    id: string;
    name: string;
    password: string;
    tokens: string[];
    role: Role;
}

/**
 * 角色
 */
export type Role = "admin" | "user";