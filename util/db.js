const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB()

AWS.config.update({
    endpoint: "http://localhost:8000"
    })
  

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

const params = {
  TableName: "Games",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH"},
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
      console.error("Error JSON.", JSON.stringify(err, null, 2));
  } else {
      console.log("Created table.", JSON.stringify(data, null, 2));
  }
});