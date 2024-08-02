import express from "express";
import cluster from "cluster";
import os from "os";

const girlfriends = ["khushi","chotu","atlassian"];
const port = 3000;

if(cluster.isPrimary){
    console.log(`Yash ${process.pid} is running`);
    for(let i =0;i<girlfriends.length;i++){
        cluster.fork({GIRLFRIEND : girlfriends[i]});
    }
    cluster.on("exit",(worker,code,signal)=>{
        console.log(`Worket ${worker.process.pid} died , couldnot handle the gf: GIVE UP`);
    })
}else{
    const app = express();
    const gf = process.env.GIRLFRIEND;
    console.log(`Worker ${process.pid} started to handle ${gf}`);
    app.get("/",(req,res)=>{
        res.send(`I am handling gf: ${gf}`);
    })
    app.listen(port,()=>{
        console.log(`Ready to listen to gf : ${gf}`);
    })

}