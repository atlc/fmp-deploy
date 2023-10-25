import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SwalError } from "../utils/SwalFire";
import { Account } from "../types";
import AccountCard from "../components/AccountCard";

const Home = () => {
    const nav = useNavigate();
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return nav("/login");

        async function loadAccounts() {
            try {
                const res = await fetch("/api/accounts", {
                    headers: { authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);

                setAccounts(data);
            } catch (error) {
                SwalError((error as Error).message);
                nav("/login");
            }
        }
        loadAccounts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="text-primary p-1 text-center rounded-3 my-3">
                    Accounts (click on a username or password to copy)
                </h1>
                {accounts.map((a, i) => (
                    <AccountCard key={`account-card-${i}`} {...a} />
                ))}
            </div>
        </div>
    );
};

export default Home;
