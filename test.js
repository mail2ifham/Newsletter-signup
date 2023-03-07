const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
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
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/17a084ba05/";

    const option = {
        method: "POST",
        auth: "ifham:bfb7b4fcd2996bc15d3cc87845c2b86d-us10"
    }

    const request = https.request(url, option, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end;
    console.log(firstName,lastName,email);

});






app.listen(3000, () => {
    console.log('server running successfully on port 3000....');
});
// bfb7b4fcd2996bc15d3cc87845c2b86d-us10
// 17a084ba05