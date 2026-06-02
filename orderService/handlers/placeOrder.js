const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const axios = require("axios");
const crypto = require("crypto");

const dynamoDbClient = new DynamoDBClient({ region: "ap-southeast-2" });
const sqsClient = new SQSClient({ region: "ap-southeast-2" });

exports.placeOrder = async (event) => {
  try {
    const { id, quantity, email } = JSON.parse(event.body);
    if (!id || !quantity || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "all fields are required" }),
      };
    }
    const productResponse = await axios.get(
      "https://kns2yhz260.execute-api.ap-southeast-2.amazonaws.com/approved-products"
    );
    const approvedProducts = productResponse.data.products || [];
    const product = approvedProducts.find((p) => p.id?.S === id);
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Product not found or not approved" }),
      };
    }
    const availableStock = parseInt(product.quantity?.N || "0");
    if (availableStock < quantity) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Insufficient stock available" }),
      };
    }
    const orderId = crypto.randomUUID();
    const orderPayload = {
      id: orderId,
      productId: id,
      quantity,
      email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Send message to SQS
    await sqsClient.send(
      new SendMessageCommand({
        QueueUrl: process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(orderPayload),
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        msg: "Order placed successfully",
        orderId,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
