import mysql from "mysql2/promise";
import config from "../config";

const pool = mysql.createPool(config.db);

export const Query = async <T = mysql.OkPacket>(sql: string, vals: unknown[] = []) => {
    const [rows] = await pool.query(sql, vals);
    return rows as T;
};
