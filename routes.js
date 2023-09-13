const express = require("express");
const User = require("./models");
const {ObjectId} = require("mongodb");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./home',  { title: "Home Page" });
})

router.post("/add",  (request, response) => {
    const user = new User({
        username: request.body.username,
        email: request.body.email,
    });
    try {
        user.save().then(r => console.log(r));
        response.redirect('/users');
    } catch(err) {
        response.status(500).send(err);
    }
});

router.get("/add", async (request, response) => {
    response.render('./add_user', { title: "Add user" })
});

router.get("/users",  (request, response) => {
        User.find().exec().then((err, users) => {
            response.render('./list_users', {
                title: "List users",
                users: users
            })
        })
});

router.get("/find", (request, response) => {
    response.render('./find_user', {
        title: 'Find User'
    });
});

router.post("/find", (req, res) => {
    let id = req.body.id;
    User.findById(ObjectId(id));
});

router.get("/delete",  (request, response) => {
    response.render('./delete_user', {
        title: 'Delete User'
    });

});

router.post("/delete", (req, res) => {
    let id = req.body.id;
    User.findByIdAndRemove(ObjectId(id));
});

module.exports = router;