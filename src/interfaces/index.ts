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