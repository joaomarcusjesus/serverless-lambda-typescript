import { ListCustomer } from '../../../use-cases/customers/list-customer';
import { CustomerRepository } from '../../../infra/repositories/dynamodb/customers/customer.repository';
import { ListCustomerController } from '../../../presentation/controllers/customers/list-customer';
import { LambdaEvent } from '../../../infra/lambda/lambda.interface';
import { DynamoDBClient } from '../../../infra/repositories/dynamodb/helpers/connection';
import { HttpResponse } from '../../../presentation/helpers/http';

export const router = async (event: LambdaEvent): Promise<HttpResponse> => {
  try {
    const repository = new CustomerRepository(new DynamoDBClient());
    const service = new ListCustomer(repository);
    const controller = new ListCustomerController(service);
    const searchQuery = event.queryStringParameters?.search;
    const response = await controller.perform({ search: searchQuery });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.body }),
    };
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Ocorreu um erro ao listar cliente' }),
    };

    return response;
  }
};
