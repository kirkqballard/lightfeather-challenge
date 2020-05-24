'use strict';
const fs = require('fs');
const express = require('express');
const Joi = require('joi'); // For validation
const app = express();
app.use(express.json()); // Only listen for json requests

/*
 * Request handler for default endpoint
 */
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the shift encode service.</h1><br/><p>Post to /api/encode to encode a message!</p>');
});

/*
 * Request handler for shift encode endpoint
 */
app.post('/api/encode', (req, res) => {

    var returnJson = {
        'EncodedMessage': ''
    }
    const { err } = validate(req.body);
    if (err) {
        res.status(500).send(returnJson) // Could send err.details[0].message instead
        return;
    }

    // Grab the json from the request
    var messageJson = req.body;

    // Encode meassage and add to the json
    const encodedMessage = shiftEncode(messageJson);
    messageJson['EncodedMessage'] = encodedMessage;

    // Persist the json to the file system
    fs.writeFile('encodedMessage.json', JSON.stringify(messageJson), function (err) {
        if (err) {
            res.status(500).send(returnJson) // Could send err.message instead
            return;
        }
        console.log('Encoded message saved to file encodedMessage.json.');
    });

    returnJson['EncodedMessage'] = encodedMessage;
    res.status(200).send(returnJson);
});

/*
 * Validate shift and message values are in appropriate ranges
 */
function validate(shiftMessage) {
    const schema = {
        Shift: Joi.number().greater(-1).less(27).required(),
        Message: Joi.string().regex(new RegExp("/[^A-Za-z\-\s]+$/")).required()
    };

    return Joi.validate(shiftMessage, schema);
}

/*
 * Encode the message value using the shift value
 * Assumes message contains only upper and lower case letters of the alphabet plus spaces and hyphens
 * Spaces and hyphens are retained in the encoded message
 */
function shiftEncode(shiftMessage) {
    /*
     * Upper case ASCII: 65 - 90
     * Lower case ASCII: 97 - 122
     */
    var shift = shiftMessage.Shift;
    var encodedMessage = shiftMessage.Message.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + shift) % 26 + 65));
    encodedMessage = encodedMessage.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + shift) % 26 + 97));

    return encodedMessage;
}

// Set the port and start listening
const port = process.env.PORT || 23456;
app.listen(port, () => console.log('Listening on port ${port}..'));
