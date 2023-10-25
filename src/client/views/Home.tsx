import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SwalError } from "../utils/SwalFire";
import { Account } from "../types";

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
                <h1>Home</h1>
                {JSON.stringify(accounts)}
            </div>
        </div>
    );
};

export default Home;
