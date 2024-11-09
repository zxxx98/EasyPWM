import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { Config } from "src/config";

const DefaultJSONMap = new Map();

DefaultJSONMap.set(Config.userJsonFileName, JSON.stringify([
    {
        id: "admin",
        name: "admin",
        password: "admin",
        role: "admin",
        tokens: [],
        systemConfig: {
            language: "zh"
        }
    }
]))

DefaultJSONMap.set(Config.passwordJsonFileName, JSON.stringify([]))

DefaultJSONMap.set(Config.syncConfigJsonFileName, JSON.stringify({
    cloudType: "cloudflare",
    cloudflareConfig: {
        accountId: "",
        apiKey: "",
        namespace: ""
    },
    autoSyncToCloud: false
}))

function getDataFilePath(fileName: string): string
{
    const tmpDataDir = path.join(os.tmpdir(), 'easy-password-manager');
    if (!fs.existsSync(tmpDataDir)) {
        fs.mkdirSync(tmpDataDir, { recursive: true });
    }
    const filePath = path.join(tmpDataDir, fileName);
    if (!fs.existsSync(filePath)) {
        const defaultStr = DefaultJSONMap.get(fileName);
        fs.writeFileSync(filePath, defaultStr ?? "[]");
    }
    return filePath;
}

function readJSONFile<T>(fileName: string, defaultValue?: T): Promise<T>
{
    const filePath = getDataFilePath(fileName);
    return new Promise<T>((resolve, reject) =>
    {
        fs.readFile(filePath, "utf-8", (err, data) =>
        {
            if (err) reject(err);
            resolve(data ? JSON.parse(data) : defaultValue);
        });
    });
}

function writeJSONFile(fileName: string, data: any): Promise<boolean>
{
    const filePath = getDataFilePath(fileName);
    return new Promise<boolean>((resolve, reject) =>
    {
        fs.writeFile(filePath, JSON.stringify(data), { flag: 'w' }, (err) =>
        {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export { readJSONFile, writeJSONFile };
