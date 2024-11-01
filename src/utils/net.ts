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

export const getUsers = async () =>
{
    const res = await axios.get('http://localhost:3000/user/getUsers');
    return res.data;
}

export const getUser = async (name: string) =>
{
    const res = await axios.get('http://localhost:3000/user/getUser', {
        params: { name }
    });
    return res.data;
}

export const login = async (name: string, password: string) =>
{
    const res = await axios.post('http://localhost:3000/user/login', {
        name, password
    });
    return res.data;
}


export const getUserByToken = async (token: string) =>
{
    const res = await axios.post('http://localhost:3000/user/getUserByToken', {
        token
    });
    return res.data;
}
