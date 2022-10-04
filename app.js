//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const status = res.statusCode;

  var data = {
     members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
  };
  var jsonData = JSON.stringify(data);
  const url = `https://us2.api.mailchimp.com/3.0/lists/${process.env.LIST};
  const options = {
    method: "POST",
    auth: process.env.AUTH
  };
const request = https.request(url, options, function(response){

response.on("data", function(data){
  console.log(JSON.parse(data));
});

  });
request.write(jsonData);
request.end();
if (status === 200 ){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}
});

app.post("/failure", function(){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running");
});
