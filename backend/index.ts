//import express module
import express from "express";

//create an express app
const app = express();

//app.use(helmet());

//declare endpoint for http GET
app.get("/", (req, res) => res.send("Hello World!"));

//declare port to be used by the server
const port = process.env.PORT || 8080;

//start http server in port 8080
app.listen(
    port,
    () => console.log('Example app listening on the port ${port}!')
);