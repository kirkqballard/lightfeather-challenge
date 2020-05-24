# ShiftEncodeService

Service to encode an alphabetic message using shift encryption.

Post a json with key 'Shift' having integer value between 0 and 26 and key 'Message' having string value. Value of 'Message' will be encoded using the value of 'Shift'.

Response is json with the shift encoded message. Encoded message is empty if request fails.

If request is successful, encoded message is also saved to json file 'encodedMessage.json' including the shift and original message.

At a minimum requires node.js and npm to run with npm start. Any IDE that supports launching web services will also work.

# SignUpForm

Web page with basic sign up form for creating an account.

No external dependencies required to open in any browser.

