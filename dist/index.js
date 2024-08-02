"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const girlfriends = ["khushi", "chotu", "atlassian"];
const port = 3000;
if (cluster_1.default.isPrimary) {
    console.log(`Yash ${process.pid} is running`);
    for (let i = 0; i < girlfriends.length; i++) {
        cluster_1.default.fork({ GIRLFRIEND: girlfriends[i] });
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worket ${worker.process.pid} died , couldnot handle the gf: GIVE UP`);
    });
}
else {
    const app = (0, express_1.default)();
    const gf = process.env.GIRLFRIEND;
    console.log(`Worker ${process.pid} started to handle ${gf}`);
    app.get("/", (req, res) => {
        res.send(`I am handling gf: ${gf}`);
    });
    app.listen(port, () => {
        console.log(`Ready to listen to gf : ${gf}`);
    });
}
