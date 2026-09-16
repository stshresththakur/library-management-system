const express=require("express");
const {users}=require("../data/users.json");

const router=express.Router();

 /**
  *  Route: /users
  * Method: GET
  * Description : GET all the list of users in the system
  * Access :Public
  * Parameters:None
  */

 router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
 })
 /**
  * Route: /users/:id
  * Method: GET
  * Description:Get a user by their ID
  * Access:Public
  * Parameters:id
  */
router.get('/:id',(req,res)=>{

    const {id}=req.params;
    const user=users.find((each)=>each.userId===id);

    if(!user){
         return res.status(404).json({
            success:false,
            message:`user not found ${id}`
        
        });
    }

    res.status(200).json({
        success:true,
        data:user
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
    const {userId,name,email,issuedDate,returnDate,subscriptionDate,subscriptionType}=req.body;

    //check if all the required fields are present 
    if(!userId || !name || !email || !issuedDate || !returnDate || !subscriptionDate || !subscriptionType){
           return res.status(400).json({
               success:false,
               message:"please provide all details required ",
            })
    }
    
    //check if the user already exists
    
    const user=users.find((each)=>each.userId===userId)
    if(user){
        return res.status(409).json({
            success:false,
            message:`user already exists with userid ${userId}`,
        })
    }
    //after checking all the caases 
    //push the user details to users

    users.push({userId,name,email,issuedDate,returnDate,subscriptionDate,subscriptionType})

    res.status(200).json({
        success:true,
        message:"user created sucessfully",
    })

  

})

/**
 * Route :/users/:id
 * Method :PUT
 * Description :updating a user by their ID
 * Access :public
 * parameters :id
 */
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    //check if the user exists
    const user=users.find((each)=>each.userId===id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:`user not find with id: ${id}`
        })
    }
    //with spread operator
    const updatedUser=users.map((each)=>{
        if(each.userId===id){
            return{
                ...each,
                ...data
            };
            
        }
        return each;
    });

        res.status(200).json({
            success:true,
            message:"user updated successfully",
            data: updatedUser,
        })

    })


/**
 * Route :/users/:id
 * Method :DELETE
 * Description :Deleting a user by their ID (check if the user still has an issued book)&&{is there any fine /penalty to collect}
 * Access :public
 * parameters :id
 */

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    
    //check if the user exists
    const user=users.find((each)=>each.userId===id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:`user not find with id: ${id}`
        })
    }


     //if user exists filter it out from users array
     // 1st method
    const updatedUser = users.filter((each)=> each.userId !==id);


    //2nd method
    //const index=users.indexOf(user);
    //users.splice(index,1);

    res.status(200).json({
        success:true,
        message:"user deleted successfully",
        data:updatedUser
    })


})


/**
 * Route :/subscription-details/:id
 * Method :GET
 * Description :get subscription details of user
 * Access :public
 * parameters :id
 */

router.get('/subscription-details/:id',(req,res)=>{
    const {id}=req.params;

    const user=users.find((each)=> each.userId===id)
    if(!user){
        return res.status(404).json({
        success:false,
        message:"user not found"
    })}

    const getDateInDays=(data='')=>{
        let date;
        if(data){
            date=new Date(data);

        }else{
            date=new Date();

        }
        let days=Math.floor(date/(1000*60*60*24));
        return days;
    }
        const subscriptiontype=(date)=>{
            if(users.subsriptionType==="Basic"){
                date=date+30;

            }
            else if(users.subscriptionType==="Standard"){
                date=date+180;

            }
            else if(users.subscriptionType === "Premium"){
                date=date+365;
            }
            return date;
        }



    

    let returnDate=getDateInDays(user.returnDate);
    let currentDate=getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiration=subscriptiontype(user.subscriptionDate);


    const data={
        ...user,
        subscriptionExpired:subscriptionExpiration < currentDate,
        subscriptionDaysLeft:subscriptionExpiration - currentDate,
        daysLeftForExpiration:returnDate-currentDate,
        returnDate:returnDate < currentDate ? "book is overdue":returnDate,
        fine:returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200:100:0,

    }

    res.status(200).json({
        success:true,
        data:data,
    });


})

module.exports=router;
