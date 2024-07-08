
const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  const date = new Date()

  const params = {
    Item: {
      __typename: {S: 'Author'},
      id: {S: event.requestContext.userAttributes.sub},
      name: {S: event.userName},
      profilePic: {
        S: 'https://placekitten.com/640/360'
      },
      createdAt: {S: date.toISOString() },
      updatedAt: {S: date.toISOString() },
      _version: {N : '1'},
      _lastChangedAt: {N: `${date.getTime()}`}
    },
    TableName: process.env.API_FULLSTACKAPP_AUTHORTABLE_NAME
  }

  try{
    const item = await ddb.putItem(params).promise()
    console.log(item)
  }catch(e){
    console.log('db : '+e);
  }

  return event;
};
