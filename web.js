const express = require("express");
const path = require("path");
const fs = require("fs");
const { info } = require("console");
const app = express();
const port = 80;

// For serving static files
app.use('/static', express.static('static'));
app.use(express.urlencoded());
// Set the template engine as pug
app.set('view engine', 'pug');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.status(200).render('./page_1/page1.pug');  // this how you can pass parameter to for website.pug file
});

app.get("/edu_videos", (req, res) => {
    res.status(200).render('./page_2/page2.pug');  // this how you can pass parameter to for website.pug file
});

app.get("/edu_notes", (req, res) => {
    res.status(200).render('./page_3/page3.pug');  // this how you can pass parameter to for website.pug file
});

app.get("/edu_form", (req, res) => {
    res.status(200).render('./page_4/page4.pug');  // this how you can pass parameter to for website.pug file
});

let entry=2;
app.post('/edu_form', (req,res)=>{
    //console.log(req.body);
    let FirstName = req.body.FirstName;
    let LastName= req.body.LastName;
    let Email=req.body.Email;
    let Address1=req.body.Address1;
    let Address2=req.body.Address2;
    let PhoneNumber=req.body.PhoneNumber;  
    let State=req.body.State;
    let Zip = req.body.Zip;
    let box = req.body.Checked;
    let info = `First name : ${FirstName},
    Last name : ${LastName},
    Email Id : ${Email},
    Address 1 : ${Address1},
    Address 2 : ${Address2},
    Phone No : ${PhoneNumber},
    state : ${State},
    Zip Code : ${Zip},
    Check box : ${box}`;
    let filename = `./details/entry${entry}.txt`; //run time genrating files.
    entry++;
    fs.writeFileSync(filename,info);
    const parameter = {'message': "Your details have been saved successfully!!"};
    res.status(200).render('./page_4/page4.pug',parameter);
});

app.listen(port, () => {
    console.log(`The express app is working on port ${port}`);
  });

