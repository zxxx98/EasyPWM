export interface IDataBase
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
    email?: string,
    remark?: string,
    config: {
        needUpperCaseAndLowerCase: boolean
        needSpecialChar: boolean
        needNumbers: boolean
        length: number
    }
}