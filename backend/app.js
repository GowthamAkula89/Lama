const express=require("express");
const compression=require("compression");
const cors=require("cors");
const httpStatus=require("http-status");
const helmet=require("helmet");
const routes= require("./src/routes");
const ApiError = require("./src/utils/ApiError");
const app=express();
//Helmet is a middleware that helps secure your Express.js applications by setting various HTTP headers.
app.use(helmet());
//This middleware is used for parsing JSON data sent in the request body.
app.use(express.json());
//This middleware is used for parsing URL-encoded data in the request body.
app.use(express.urlencoded({ extended: true }));
//This middleware is provided by the compression library. It automatically compresses the response data 
//using the gzip compression algorithm. This helps reduce the size of the data being sent from the server to the client, 
//leading to faster response times and reduced bandwidth usage. 
app.use(compression());
/*app.use(cors()) middleware in an Express.js application is used to enable Cross-Origin Resource Sharing (CORS). 
CORS is a security feature implemented by web browsers to restrict web pages from making requests to a domain 
that is different from the one that served the web page. This restriction is known as the same-origin policy.

When you make an HTTP request from a client-side application (such as a web browser) to a server, 
the browser enforces the same-origin policy. If the server's domain is different from the domain of the 
client-side application, the browser, by default, blocks the request for security reasons.
*/
app.use(cors());
app.options("*",cors());
app.use("/v1",routes);
app.use((req,res,next)=>{
    next(new ApiError(httpStatus.NOT_FOUND,"Not found"));
})
module.exports=app;