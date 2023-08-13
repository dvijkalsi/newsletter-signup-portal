var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var https = require('https');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) { 
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    // console.log(firstName + ' ' + lastName + ' ' + email);

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var url = 'https://us9.api.mailchimp.com/3.0/lists/4efe5a6a70';


    var options = {
        method: 'POST',
        auth: 'Dvij:56794498e2df561d8d0a10b79824e4e1-us9'
    }

    var request = https.request(url, options, function (response) {

        if (response.statusCode === 200 ) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    // request.write(jsonData);
    request.end();




});

app.post('/failure', function (req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
