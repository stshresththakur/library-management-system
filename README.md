# library-management-system

    comitting by shresth 

this is a library management API backend for the management of users and the books

# Routes and the Endpoints

## /users
GET :GET all the list of usrs in the system
POST: Create/Register a new user

## /usrs/{id}
GET:Get a user by their ID
PUT:updating a user by their ID
DELETE:Deleting a user by their ID (check if the user still has an issued book)&&{is there any fine /penalty to collect}

## /users/subscription-details/{id}
GET:Get a user subscription details by their ID
    >> Date of subscription details by their ID
    >>Valid till?
    >>Fine if any

## /books 
GET: Get all the books in the system
POST:Add a new book to the system


## /books/{id}
GET:Get a book by its ID
PUT:Update a book by its ID
DELETE:Delete a book by its ID

## /books/issued
GET:Get all the issued books

## /books/issued/withFine
GET:Get all issued books with their fine amount

### Subscription types
    >> Basic (3 months)
    >> Standard (6 moonths)
    >> Premium (12 months)

> > If a user missed the renewal date,then user should be collected with $100
> > If a user misses his subscription ,then user is expected to pay $100
> > If a user misses both renewal & subscription,then the collected amount should be $200

## Commands:
npm init 
npm i express
npm i nodemon --save-dev

npm run dev

to restore node modules and package 