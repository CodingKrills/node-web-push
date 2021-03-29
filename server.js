const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

// set static
app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json());

// 1) generate vapi keys by this command
// ./node_modules/.bin/web-push generate-vapid-keys

const publicVapidKey = 'BNMvpwaWOPsNCQH6bgWt9caDGR3WBK84SmevhBteuX5fwMmh5DcNQmb69EF4-C0AssRDBjU45oYs7RJIS1Bn6r0'

const privateVapidKey = 'k8r3iwiDckECrgyQ2bGxBP350O6c4cSjLXGKQ18LKqo'


webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey
);

// subscribe route

app.post('/subscribe', (req, res) => {
    // Get Push subscription 

    const subscription = req.body;

    console.log("subscription =====  >   ", req.body)

    // send 201 json
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });

    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
})


const PORT = 5000;

app.listen(PORT, () => console.log(`Server started at post -> ${PORT}`))