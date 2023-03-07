const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "bfb7b4fcd2996bc15d3cc87845c2b86d-us10",
  server: "us10",
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
  const listId = "17a084ba05";

  const subscribingUser = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email
  };

  async function addMember() {

    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });

      if (response.hasOwnProperty("id")) {
        // res.send('success');
        res.sendFile(__dirname + "/success.html");
        console.log(response.id);
      }
      
    } catch (error) {
      // res.send(error.status);
      res.sendFile(__dirname + "/failure.html");
      // res.sendStatus(error.status);
    }
  }
  addMember();
  
});

app.post("/failure", (req,res)=>{
  res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT || 3000, () => {
  console.log('server running successfully on port 3000....');
});
// bfb7b4fcd2996bc15d3cc87845c2b86d-us10
// 17a084ba05