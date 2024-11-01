export interface IPasswordAPI
{
    getAll(): Promise<IPassword[]>;
    add(password: IPassword): Promise<boolean>;
    update(password: IPassword): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface IPassword
{
    id: string,
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
}

export interface IToken
{
    token: string;
    createTime: number;
    deleteTime: number;
}

/**
 * 角色
 */
export type Role = "admin" | "user";

