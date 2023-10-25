import express from "express";
import mw from "../mw";

const router = express.Router();

router.post("/login", mw.login).post("/register", mw.register);

export default router;
