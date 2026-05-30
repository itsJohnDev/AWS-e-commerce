const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDbClient = new DynamoDBClient({ region: "ap-southeast-2" });

// Lambda function to get all categories from Dynamodb

exports.getAllCategories = async () => {
  try {
    const tableName = process.env.DYNAMO_TABLE;

    // ScanCommand to fetch all categories
    const scanCommand = new ScanCommand({
      TableName: tableName,
    });

    const { Items } = await dynamoDbClient.send(scanCommand);

    // check if items found, if none return empty array/list
    if (!Items || Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: "No Categories Found" }),
      };
    }

    const categories = Items.map((item) => ({
      categoryName: item.categoryName.S,
      imageUrl: item.imageUrl.S,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
