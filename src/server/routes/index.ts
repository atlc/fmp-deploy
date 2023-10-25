import express from "express";
import auth from "./auth";
import api from "./api";
import mw from "../mw";

const router = express.Router();

router.use("/auth", auth);
router.use("/api", mw.tokenCheck, api);

export default router;
