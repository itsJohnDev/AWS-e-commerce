//Import the required AWS Cognito SDK Classes
//CognitoIdentityProviderClient: used to communicate with Cognito
//SignUpCommand: used to send sign-up request to Cognito to create new user
const {
  CognitoIdentityProviderClient,
  SignUpCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const UserModel = require("../models/userModel");
const client = new CognitoIdentityProviderClient({
  region: process.env.REGION,
});
//specify the Cognito app client id
//the app client id tells Cognito which app is making the request

const CLIENT_ID = process.env.CLIENT_ID;

//define  a lambda function to send sign-up requests

exports.signUp = async (event) => {
  const { email, fullName, password } = JSON.parse(event.body);

  //Prepare parameter required by Cognito's SignUpCommand
  const params = {
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: fullName },
    ],
  };

  try {
    //Create the SignUpCommand object with the prepared paramenters
    const command = new SignUpCommand(params);

    await client.send(command);

    const newUser = new UserModel(email, fullName);
    await newUser.save();
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "User successfully signed up!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "unexpected error", error: error.message }),
    };
  }
};
