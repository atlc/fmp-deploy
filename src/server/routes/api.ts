import express from "express";
import { MysqlError } from "mysql";
import db from "../db";

const router = express.Router();

router.get("/accounts", async (req, res) => {
    try {
        const accounts = await db.accounts.all();
        res.json(accounts);
    } catch (error) {
        const err = error as MysqlError;
        res.status(500).json({
            message: "An error occurred while retrieving accounts - " + err.sqlMessage || err.message,
        });
    }
});

export default router;
