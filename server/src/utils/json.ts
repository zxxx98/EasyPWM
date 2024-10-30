import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { Config } from "../config";
import { IPassword } from "src/interfaces";

function getDataFilePath(): string
{
    const tmpDataDir = path.join(os.tmpdir(), 'easy-password-manager');
    if (!fs.existsSync(tmpDataDir)) {
        fs.mkdirSync(tmpDataDir, { recursive: true });
        fs.writeFileSync(path.join(tmpDataDir, Config.jsonFileName), "[]");
    }
    return path.join(tmpDataDir, Config.jsonFileName);
}

function readJSONFile(): Promise<IPassword[]>
{
    const filePath = getDataFilePath();
    return new Promise<IPassword[]>((resolve, reject) =>
    {
        fs.readFile(filePath, "utf-8", (err, data) =>
        {
            if (err) reject(err);
            resolve(data ? JSON.parse(data) : []);
        });
    });
}

function writeJSONFile(passwords: IPassword[]): Promise<boolean>
{
    const filePath = getDataFilePath();
    return new Promise<boolean>((resolve, reject) =>
    {
        fs.writeFile(filePath, JSON.stringify(passwords), { flag: 'w' }, (err) =>
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
