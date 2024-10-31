import axios from "axios";
import { IPassword } from "../interfaces";

/**
 * 获取密码列表
 * @returns 
 */
export const getPasswordList = async (): Promise<IPassword[]> =>
{
    const res = await axios.get('http://localhost:3000/getAll', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status === 200) {
        return res.data;
    }
    return [];
}

export const addPassword = async (password: IPassword) =>
{
    const res = await axios.post('http://localhost:3000/add', password);
    return res.data;
}

export const updatePassword = async (password: IPassword) =>
{
    const res = await axios.post('http://localhost:3000/update', password);
    return res.data;
}

export const deletePassword = async (id: string) =>
{
    const res = await axios.post('http://localhost:3000/delete', { id });
    return res.data;
}