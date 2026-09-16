 const express =require("express");

const userRouter=require("./routes/users");
const booksRouter=require("./routes/books");

 const app=express();


 const PORT=4000;

 app.use(express.json());


 app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Home Page :-)"
    })
 })

 app.use("/users",userRouter);
 app.use("/books",booksRouter);


 app.listen(PORT,()=>{
    console.log(`server is up and running on http://localhost:${PORT}`)

    
 })