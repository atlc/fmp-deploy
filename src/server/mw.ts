import db from "./db";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Payload } from "./types";
import type { RequestHandler } from "express";
import config from "./config";
import { MysqlError } from "mysql";

const signToken = (payload: Payload) => {
    return jwt.sign(payload, config.token.key, { expiresIn: "90d" });
};

const verifyToken = (token: string): Payload => {
    return jwt.verify(token, config.token.key) as Payload;
};

const register: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email" });
    if (!password) return res.status(400).json({ message: "Missing password" });

    try {
        // Block to validate if user account previously existed and if so, login
        const [existingUser] = await db.users.find(email);
        if (existingUser) {
            const matches = await bcrypt.compare(password, existingUser.password);
            if (!matches) return res.status(401).json({ message: "Invalid credentials" });

            const token = signToken({ email });
            return res.status(200).json({ message: "Logged in, thanks.", token });
        }
        // End of login-if-previously-existed block

        const newUser = { email, password };
        newUser.password = await bcrypt.hash(password, 12);
        await db.users.register(newUser);

        const payload = { email };
        const token = signToken(payload);
        res.status(200).json({ message: "Registered, thanks.", token });
    } catch (error) {
        const err = error as MysqlError;
        res.status(500).json({ message: "An error occurred while registering - " + err.sqlMessage || err.message });
    }
};

const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email" });
    if (!password) return res.status(400).json({ message: "Missing password" });

    try {
        const [user] = await db.users.find(email);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const matches = await bcrypt.compare(password, user.password);
        if (!matches) return res.status(401).json({ message: "Invalid credentials" });

        const token = signToken({ email });
        res.status(200).json({ message: "Successfully logged back in", token });
    } catch (error) {
        const err = error as MysqlError;
        res.status(500).json({ message: "An error occurred while logging in - " + err.sqlMessage || err.message });
    }
};

const tokenCheck: RequestHandler = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) return res.status(401).json({ message: "Missing auth headers" });

    const [type, token] = authHeaders.split(" ");
    if (!type || !token || type !== "Bearer") return res.status(401).json({ message: "Invalid auth headers" });

    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        const err = error as JsonWebTokenError;
        return res.status(401).json({ message: "Invalid token - " + err.cause || err.message });
    }
};

export default {
    register,
    login,
    tokenCheck,
};
