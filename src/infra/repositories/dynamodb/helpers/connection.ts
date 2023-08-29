import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import IDynamoDBClient from './dynamodb-client';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

export class DynamoDBClient implements IDynamoDBClient {
  private client: DocumentClient;

  constructor() {
    new DynamoDB({
      region: 'us-east-1',
    });

    this.client = new DocumentClient();
  }

  getClient(): DocumentClient {
    return this.client;
  }
}
