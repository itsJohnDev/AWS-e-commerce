const {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({
  region: "ap-southeast-2",
});

// Define Cognito App Client Id
const CLIENT_ID = process.env.CLIENT_ID;

exports.confirmForgotPassword = async (event) => {
  const { email, code, newPassword } = JSON.parse(event.body);

  const params = {
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  };

  try {
    const command = new ConfirmForgotPasswordCommand(params);

    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Password has been reset." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Password reset failed",
        error: error.message,
      }),
    };
  }
};
