const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDbClient = new DynamoDBClient({ region: "ap-southeast-2" });

exports.getApprovedProducts = async () => {
  try {
    // Get dynamodb table name from env variable
    const tableName = process.env.DYNAMO_TABLE;

    // Define a scanCommand to fetch all products where isAprroved is true

    const scanCommand = new ScanCommand({
      TableName: tableName,
      FilterExpression: "isApproved = :trueVal",
      ExpressionAttributeValues: {
        ":trueVal": { BOOL: true },
      },
    });

    const { Items } = await dynamoDbClient.send(scanCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ products: Items || [] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
