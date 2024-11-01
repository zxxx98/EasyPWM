import * as path from "path";
import * as fs from "fs";
import * as os from "os";

function getDataFilePath(fileName: string): string
{
    const tmpDataDir = path.join(os.tmpdir(), 'easy-password-manager');
    if (!fs.existsSync(tmpDataDir)) {
        fs.mkdirSync(tmpDataDir, { recursive: true });
        fs.writeFileSync(path.join(tmpDataDir, fileName), "[]");
    }
    return path.join(tmpDataDir, fileName);
}

function readJSONFile<T>(fileName: string): Promise<T[]>
{
    const filePath = getDataFilePath(fileName);
    return new Promise<T[]>((resolve, reject) =>
    {
        fs.readFile(filePath, "utf-8", (err, data) =>
        {
            if (err) reject(err);
            resolve(data ? JSON.parse(data) : []);
        });
    });
}

function writeJSONFile(fileName: string, data: any[]): Promise<boolean>
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
