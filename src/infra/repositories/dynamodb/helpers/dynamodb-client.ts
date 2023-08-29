import { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface IDynamoDBClient {
  getClient(): DocumentClient;
}

export default IDynamoDBClient;
