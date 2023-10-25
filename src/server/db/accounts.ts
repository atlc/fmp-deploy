import { Account } from "../types";
import { Query } from "./connection";

const all = () => Query<Account[]>("SELECT * FROM Accounts");

export default {
    all,
};
