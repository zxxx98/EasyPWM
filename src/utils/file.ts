import { IPassword } from "../interfaces";
import { getPasswordList, updatePassword, updatePasswordList } from "./net";

export function exportPasswordList(passwordList: IPassword[])
{
    const blob = new Blob([JSON.stringify(passwordList, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwordList.json';
    a.click();
}

export async function importLocalConfig(userId: string)
{
    return new Promise((r, j) =>
    {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = () =>
            {
                const file = input.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = async () =>
                    {
                        const passwordList = JSON.parse(reader.result as string) as IPassword[];
                        console.log(passwordList);
                        if (passwordList) {
                            //合并现有的密码列表,如果id相同，用导入的覆盖，如果导入的不存在于现有的密码列表中，则添加
                            let currentPasswordList = await getPasswordList(userId);
                            //删除导入的密码列表中已存在的密码
                            currentPasswordList = currentPasswordList.filter(item => !passwordList.some(p => p.id === item.id));
                            //添加导入的密码
                            currentPasswordList.push(...passwordList);
                            r(await updatePasswordList(currentPasswordList));
                        }
                    };
                }
            }
            input.click();
        } catch (error) {
            j(false);
        }
    })

}
