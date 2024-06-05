const app=require("./app");
const connectDB = require('./src/config/config');
const NODE_PORT=process.env.NODE_PORT || 4000 ;
connectDB();
app.listen(NODE_PORT ,()=>{
    console.log(`Listening in the port: ${NODE_PORT}`);
})
