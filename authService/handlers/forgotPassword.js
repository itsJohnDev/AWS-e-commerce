const {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({
  region: "ap-southeast-2",
});

// Define Cognito App Client Id
const CLIENT_ID = process.env.CLIENT_ID;

exports.forgotPassword = async (event) => {
  const { email } = JSON.parse(event.body);

  const params = {
    ClientId: CLIENT_ID,
    Username: email,
  };

  try {
    const command = new ForgotPasswordCommand(params);
    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "To reset your password, please check your email for confirmation code",
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "Password reset failed" }),
    };
  }
};
