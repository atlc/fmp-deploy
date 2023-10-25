import React from "react";
import { Account } from "../types";
import { SwalSuccess } from "../utils/SwalFire";
import Clipboard from "./Clipboard";

const AccountCard = ({ name, username, password, url }: Account) => {
    const copyText = async (text: string, field: "username" | "password") => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
        } else {
            document.execCommand("copy", true, text);
        }

        SwalSuccess(`Copied ${field}!`);
    };

    return (
        <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h1 className="bg-primary rounded-3 text-center text-info">{name}</h1>
                    <div className="form-group row">
                        <label onClick={() => copyText(username, "username")} className="col-form-label text-muted">
                            Username <Clipboard />
                        </label>
                        <p
                            className="bg-info-subtle rounded-3 text-primary"
                            onClick={() => copyText(username, "username")}
                        >
                            <strong>{username}</strong>
                        </p>
                    </div>
                    <div className="form-group row">
                        <label onClick={() => copyText(password, "password")} className="col-form-label text-muted">
                            Password <Clipboard />
                        </label>
                        <p
                            className="bg-info-subtle rounded-3 text-primary"
                            onClick={() => copyText(password, "password")}
                        >
                            <strong>{password}</strong>
                        </p>
                    </div>
                    <a href={url} target="_blank" rel="noreferrer">
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
