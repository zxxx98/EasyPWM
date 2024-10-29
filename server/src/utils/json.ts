import * as path from "path";
import * as fs from "fs";
import { Config } from "../config";
import { IPassword } from "src/interfaces";

function readJSONFile(): Promise<IPassword[]>
{
    const filePath = path.join(Config.jsonFileName);
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
    const filePath = path.join(__dirname, Config.jsonFileName);
    return new Promise<boolean>((resolve, reject) =>
    {
        fs.writeFile(filePath, JSON.stringify(passwords), (err) =>
        {
            if (err) resolve(false);
            resolve(true);
        });
    });
}

export { readJSONFile, writeJSONFile };
