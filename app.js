//jshint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const listId = "put your list id here"; 
const apiKey = "put your API Key Here"; 

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
    console.log("server running on port 3000");
    
});

app.get("/",function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    "FNAME" : fname,
                    "LNAME" : lname
                }
            }
        ]      
    };

    var jsonData = JSON.stringify(data); 
 
    console.log(fname + " " + lname + " " + " " + email);

    var options = {
        url : "https://us4.api.mailchimp.com/3.0/lists/" + listId,
        method : "POST",
        headers : {
          "Authorization" : "rajesh " + apiKey 
        },
        body : jsonData

    }

    request(options, function(error, response, body) {
        console.log(res.statusCode);
        
       if(error){
           //res.send("there was an error signing up");
           res.sendFile(__dirname + "/failure.html");
        }else {
            if(res.statusCode === 200){
                //res.send("Successfully subscribed");      
                res.sendFile(__dirname + "/success.html");  
            }else{
                res.sendFile(__dirname + "/failure.html");
            }    
                   
        } 
    });

    
});