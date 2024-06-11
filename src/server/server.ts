import cors from "cors";
import express from "express";
import routes from "./routes";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();
app.use(express.json());
app.use(routes);

console.log("Hello World!");

if (isDevelopment) {
    app.use(cors());
}

if (isProduction) {
    app.use(express.static("public"));
}

if (isProduction) {
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root: "public" });
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
