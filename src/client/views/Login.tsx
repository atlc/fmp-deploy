import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SwalError, SwalSuccess } from "../utils/SwalFire";

const Login = () => {
    const nav = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ email: "", password: "" });

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        if (!form["email"]) return SwalError("Must have email filled out");
        if (!form["password"]) return SwalError("Must have password filled out");

        const url = isLogin ? "/auth/login" : "/auth/register";

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            SwalSuccess(data.message);

            if (data.token) {
                localStorage.setItem("token", data.token);
                nav("/");
            }
        } catch (error) {
            SwalError((error as Error).message);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-8 mt-5">
                    <div className="mx-1 border card shadow-lg">
                        <div>
                            <h6 className="bg-primary">
                                <span onClick={() => setIsLogin(!isLogin)} className="m-2 btn btn-secondary">
                                    Currently <strong>{isLogin ? "logging in" : "registering"}</strong>. Switch to{" "}
                                    {isLogin ? "register" : "login"}?
                                </span>
                            </h6>
                        </div>
                        <div className="card-body">
                            <label className="text-primary">Email:</label>
                            <input
                                name="email"
                                value={form["email"]}
                                onChange={updateForm}
                                className="form-control"
                                placeholder="nun@ya.bizness"
                                type="email"
                            />
                            <label className="text-primary">Password:</label>
                            <input
                                name="password"
                                value={form["password"]}
                                onChange={updateForm}
                                className="form-control"
                                placeholder="password123"
                                type="password"
                            />
                            <button onClick={handleClick} className="my-2 btn btn-secondary">
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
