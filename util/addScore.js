const AWS = require("aws-sdk");

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
})

AWS.config.getCredentials(function (err) {
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
    { AttributeName: "id", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

const dynamodb = new AWS.DynamoDB()

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Error JSON.", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table.", JSON.stringify(data, null, 2));
  }
});

const addScore = (item, table) => {

if(item && table) {

var params = {
    TableName: table,
    Item: {
        id : { N: item.id },
        name: { N: item.name },
        feeder: { N: item.feeder }
    }
};

console.log("item added")

dynamodb.putItem(params, console.log)
}

}

module.exports =  addScore