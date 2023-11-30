const express = require("express");
const app = express();
require("./connection");
const BookStore = require("./bookSchema");

const path = require("path");
const hbs = require("hbs");

app.use(express.static(path.join((__dirname + '/public/styles'))));

app.set("view engine", "hbs");
app.use(express.json());   // to get the updated data after "post"
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
})
app.post("/check", async (req, res) => {
    try {
        const name = req.body.name;
        const author = req.body.author;
        const deletetext = req.body.deletetext;
        console.log(name + "name is");
        const getDocument = async () => {
            const result = await BookStore.find({ $or: [{ name: name }, { author: author }] });
            console.log(`searched book is ${result}`);
            const id = result;
            // console.log("the id is " + id);
            if (deletetext === "delete") {
                console.log("inside delete 1st step");
                        const deleteBook = await BookStore.findByIdAndDelete(id);
                        if (!id) return res.status(400).send("wrong id");
                        res.status(200).send(deleteBook);
            }
            return result;
        }
    const returnedResult = getDocument();
    res.status(200).send(returnedResult);
} 
catch (error) {
    console.log("this is the error while checking or deleting"+ error );
}
})
app.post("/register", async (req, res) => {
    try {
        console.log("author name" + req.body.author);
        const registerBook = new BookStore({
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            date: req.body.date,
            type: req.body.type,
        })
        const registered = await registerBook.save();

        res.status(201).render("succesful");
    }
    catch (error) {
        res.status(400).send(error);
    }
})
app.post("/checkabook", (req, res) => {
    res.render("checkabook");
})
app.post("/publish", (req, res)=>{
    res.render("index");
})

// UPDATE REQUEST BY ID
app.patch("/register/:id", async (req, res)=> {
    try{
        const _id = req.params.id;
        const updateBook = await BookStore.findByIdAndUpdate({_id: _id}, req.body, {
            new : true
        });
        console.log(updateBook);
        res.send(updateBook);
    }
    catch(e){
        res.status(404).send(e);
    }
})


app.listen(3000, () => {
    console.log("server is running on port 3000");
})