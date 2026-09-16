const express=require("express");
const {books}=require("../data/books.json");
const {users}=require("../data/users.json");

const router=express.Router();


 /**
  *  Route: /
  * Method: GET
  * Description : GET all the list of books in the system
  * Access :Public
  * Parameters:None
  */

 router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
 })

/**
  * Route: /:id
  * Method: GET
  * Description:Get a book by their ID
  * Access:Public
  * Parameters:id
  */
router.get('/:id',(req,res)=>{

    const {id}=req.params;
    const book=books.find((each)=>each.id===id);

    if(!user){
         return res.status(404).json({
            success:false,
            message:`book not found ${id}`
        
        });
    }

    res.status(200).json({
        success:true,
        data:book
    })
}) 

/**
 * Route :/users
 * Method :POST
 * Description :Create/Register a new user
 * Access :public
 * parameters :none
 */



router.post('/',(req,res)=>{
    const {id,isbn,title,author,genre,publicationYear,publisher,location,section,shelf}=req.body;

    //check if all the required fields are present 
    if(!id || !isbn || !title || !author || !genre|| !publicationYear || !publisher || !location || !section || !shelf){
           return res.status(400).json({
               success:false,
               message:"please provide all details required ",
            })
    }
    
    //check if the book already exists
    
    const book=books.find((each)=>each.id===id)
    if(book){
        return res.status(409).json({
            success:false,
            message:`book already exists with bookid ${id}`,
        })
    }
    //after checking all the cases 
    //push the user details to books

    books.push({id,isbn,title,author,genre,publicationYear,publisher,location,section,shelf})

    res.status(200).json({
        success:true,
        message:"book registered sucessfully",
    })

  

})


/**
 * Route :/:id
 * Method :PUT
 * Description :updating a book by their ID
 * Access :public
 * parameters :id
 */
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    //check if the user exists
    const book=books.find((each)=>each.id===id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:`book not find with id: ${id}`
        })
    }
    //with spread operator
    const updatedbook=books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data
            };
            
        }
        return each;
    });

        res.status(200).json({
            success:true,
            message:"book updated successfully",
            data: updatedbook,
        })

    })


/**
 * Route :/:id
 * Method :DELETE
 * Description :Deleting a book by their ID 
 * Access :public
 * parameters :id
 */

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    
    //check if the book exists
    const book=books.find((each)=>each.id===id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:`book not found with id: ${id}`
        })
    }


     //if book exists filter it out from users array
     // 1st method
    const updatedbook = books.filter((each)=> each.id !==id);


    //2nd method
    //const index=books.indexOf(book);
    //books.splice(index,1);

    res.status(200).json({
        success:true,
        message:"book deleted successfully",
        data:updatedbook
    })


})


/**
 * Route :/books/issued/for-users
 * Method :GET
 * Description ::Get all the issued books
 * Access :public
 * parameters :none
 */

router.get('/issued/for-users',(req,res)=>{

    const userswithissuedBooks=users.filter((each)=>{
        if(each.issuedbook){
            return each;
        }
    })

    const issuedbooks=[];

    userswithissuedBooks.forEach((each) => {

        const book=books.find((book)=>book.id===each.issuedbook);

        

        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;
        
    });

    issuedbooks.push(book);

    if(!issuedbooks){
        return res.status(404).son({
            success:false,
            message:"no book issued"
        })
    }

    res.status(200).json({

        success:true,
        data:issuedbooks

    })


})


module.exports=router;