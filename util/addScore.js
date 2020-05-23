const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB()
const config = require('../config/config.js');

  const addScore = (item, table) => {

    AWS.config.update(config.aws_local_config);

    if (item && table) {
      var params = {
        TableName: table,
        Item: {
          id: { N: item.id },
          name: { N: item.name },
          feeder: { N: item.feeder }
        }
      };

      dynamodb.putItem(params, console.log)
    }

  }

module.exports.addScore = addScore