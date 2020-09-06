import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {//See what the event and context are
// event has all the informatino about the event like event body, query parameters, path parameters, headers
// context has metadata about execution of lambda function; if you have authentication
// and you have a few lambdas that need the id, create middleware that puts user id in context
// can add custom data to events and context via middleware
// following is the format expected on return.
   const body = JSON.parse(event.body);
   const now = new Date();

   const auction = {
       id: uuid(),
       title: body.title,
       status: 'OPEN',
       createdAt: now.toISOString(),
   };

   await dynamodb.put({
       TableName: process.env.AUCTIONS_TABLE_NAME,
       Item: auction,
   }).promise();

    return {
      statusCode: 201,
      // body has to be in string
      //body: JSON.stringify({ message: 'Hello from Sanil' }),
      body: JSON.stringify(auction),
    };
  }
  
  export const handler = createAuction;
  
 
  
  