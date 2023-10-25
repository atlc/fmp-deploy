import dotenv from "dotenv";
dotenv.config();

const db = {
    url: process.env.DB_URL as string,
};

const token = {
    key: process.env.TOKEN_KEY as string,
};

export default {
    db,
    token,
};
