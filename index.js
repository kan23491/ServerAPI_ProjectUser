const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(express.json());
app.use(cors());


//get
app.get("/api/getUser", async (req, res) => {
    try {
        const allUser = await pool.query("SELECT * FROM public.'user'");

        res.json(allUser.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//getuser

app.get('/user/:id', async (req ,res) => {
    try {
        const { id } = req.params;
        const userId = await pool.query("SELECT * FROM user WHERE user_id = $1",[id]);

        res.json(userId.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//create 
app.post("/newUser", async (req, res) => {
    try{
        const {user_id} = req.body;
        const {name} = req.body;
        const {email} = req.body;
        const {department} = req.body;
        const {job} = req.body;
        const {password} = req.body;
        const {role} = req.body;
        const newUser = await pool.query(
            "INSERT INTO public.'user'(user_id, name, email, password, department, job, role) VALUES ($1,$2,$3,$4,$5,$6,$7) RETLRNING*",
            [user_id, name, email, password, department, job, role]);

            res.json(newUser.rows[0]);

    } catch (err) {
        console.log(error.message);
    }
});

//update 
app.put("/edit/:id", async (req, res) => {
    try {
        const {user_id} = req.params;
        const {name} = req.body;
        const {email} = req.body;
        const {department} = req.body;
        const {job} = req.body;
        const {password} = req.body;
        const {role} = req.body;

        const updateUser = await pool.query("UPDATE public.'user' SET user_id=$1, name=$2, email=$3, department=$4, password=$5, job=$6, role=$7",
        [user_id, name, email, password, department, job, role]);

        res.json("Edit data user");

    } catch (error) {
        console.log(error.message);
    }
});

//delete 
app.delete("/deleteUser*:id" , async (req, res) => {
    try {
        const {user_id} = req.params;
        const deleteUser = await pool.query("DELETE FROM public.'user' WHERE user_id = $1",[id]);

        res.json("user was delete");
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000,() => {
    console.log("server is runing on port 5000");
});