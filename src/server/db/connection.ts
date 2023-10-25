import mysql from "mysql";
import config from "../config";

const pool = mysql.createPool(config.db.url);

export const Query = <T = mysql.OkPacket>(sql: string, vals: unknown[] = []) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, vals, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
