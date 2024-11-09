import axios from "axios";
import { IPassword, ISyncConfig, IUser } from "../interfaces";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
/**
 * 获取密码列表
 * @returns 
 */
export const getPasswordList = async (userId: string): Promise<IPassword[]> =>
{
    const res = await axios.post(`${API_URL}/getAll`, {
        userId
    })
    if (res.data) {
        return res.data;
    }
    return [];
}

export const addPassword = async (password: IPassword) =>
{
    const res = await axios.post(`${API_URL}/add`, password);
    return res.data;
}

export const updatePassword = async (password: IPassword) =>
{
    const res = await axios.post(`${API_URL}/update`, password);
    return res.data;
}

export const updatePasswordList = async (passwordList: IPassword[]): Promise<boolean> =>
{
    const res = await axios.post(`${API_URL}/updateList`, passwordList);
    return res.data;
}

export const deletePassword = async (id: string) =>
{
    const res = await axios.post(`${API_URL}/delete`, { id });
    return res.data;
}

export const getUsers = async () =>
{
    const res = await axios.get(`${API_URL}/user/getUsers`);
    return res.data;
}

export const getUser = async (name: string) =>
{
    const res = await axios.get(`${API_URL}/user/getUser`, {
        params: { name }
    });
    return res.data;
}

export const login = async (name: string, password: string) =>
{
    const res = await axios.post(`${API_URL}/user/login`, {
        name, password
    });
    return res.data;
}


export const getUserByToken = async (token: string) =>
{
    const res = await axios.post(`${API_URL}/user/getUserByToken`, {
        token
    });
    return res.data;
}

export const deleteUser = async (id: string) =>
{
    const res = await axios.post(`${API_URL}/user/delete`, { id });
    return res.data;
}

export const updateUser = async (user: IUser) =>
{
    const res = await axios.post(`${API_URL}/user/update`, user);
    return res.data;
}

export const addUser = async (user: IUser) =>
{
    const res = await axios.post(`${API_URL}/user/add`, user);
    return res.data;
}

export const getConfigLocal = async () =>
{
    const res = await axios.get(`${API_URL}/cloud/getConfigLocal`);
    return res.data as ISyncConfig;
}

export const saveConfigLocal = async (config: ISyncConfig) =>
{
    const res = await axios.post(`${API_URL}/cloud/saveConfigLocal`, config);
    return res.data;
}
