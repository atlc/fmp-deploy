import { BaseUser, User } from "../types";
import { Query } from "./connection";

const register = (newUser: BaseUser) => Query("INSERT INTO Users SET ?", [newUser]);
const find = (email: BaseUser["email"]) => Query<User[]>("SELECT * FROM Users WHERE email=?", [email]);

export default {
    register,
    find,
};
