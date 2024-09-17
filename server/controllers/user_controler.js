const mysql = require("mysql");

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'jude17292',
    database: process.env.DB_NAME || 'express_practice'
});

// Function to handle the view
exports.view = (req, res) => {
    const query = "SELECT * FROM user";
    
    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query: " + err);
            res.status(500).send("Server Error");
            return;
        }
        
        // Render the results
        console.log("Query successful");
        res.render("home", { results });
    });
};


exports.adduser = (req,res)=>{
    res.render("adduser");
};

exports.save = (req,res)=>{
    const {name,age,city}=req.body;
    console.log(name);
    console.log(age);
    console.log(city);
    const query = "INSERT INTO user (Name, age, city) VALUES(?,?,?)"
    db.query(query, [name,age,city],(err, results) => {
        if (err) {
            console.error("Error executing query: " + err);
            res.status(500).send("Server Error");
            return;
        }
    });
    res.render("adduser");
};





exports.edituser = (req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM user WHERE id = ?";
    const {name,age,city}=req.body;
    db.query(query, [id],(err, results) => {
        if (err) {
            console.error("Error executing query: " + err);
            res.status(500).send("Server Error");
            return;
        }
        res.render("edituser",{results});
    });
    
};



exports.save_changes = (req,res)=>{
    const id = req.params.id;
    const {name,age,city}=req.body;
    const query = "UPDATE user SET Name = ?, age = ?, city = ? WHERE ID = ?;"
    db.query(query, [name,age,city,id],(err, results) => {
        if (err) {
            console.error("Error executing query: " + err);
            res.status(500).send("Server Error");
            return;
        }
        db.query("SELECT * FROM user WHERE id = ?", [id],(err, results) => {
            if (err) {
                console.error("Error executing query: " + err);
                res.status(500).send("Server Error");
                return;
            }
            res.render("edituser",{results});
        });
    });
    
    
};


exports.deleteuser= (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM user";
    db.query("DELETE FROM user WHERE ID = ?;",[id], (err) => {
        if (err) {
            console.error("Error executing query: " + err);
            res.status(500).send("Server Error");
            return;
        }
        res.redirect("/");
    });
};