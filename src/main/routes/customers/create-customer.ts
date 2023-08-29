import { CustomerRepository } from '../../../infra/repositories/dynamodb/customers/customer.repository';
import { CreateCustomer } from '../../../use-cases/customers/create-customer';
import { CreateCustomerController } from '../../../presentation/controllers/customers/create-customer';
import { responseDecorator } from '../../../main/decorator/response';
import { LambdaEvent } from '../../../infra/lambda/lambda.interface';
import { DynamoDBClient } from '../../../infra/repositories/dynamodb/helpers/connection';

export const router = async (event: LambdaEvent): Promise<any> => {
  try {
    const repository = new CustomerRepository(new DynamoDBClient());
    const service = new CreateCustomer(repository);
    const controller = new CreateCustomerController(service);

    if (event.body === null) {
      throw new Error();
    }

    const requestBody = JSON.parse(event.body);

    const input = {
      first_name: requestBody.first_name,
      last_name: requestBody.last_name,
      email: requestBody.email,
      phone: requestBody.phone,
    };

    return await controller.perform(input);
  } catch (error) {
    return responseDecorator(500, { error });
  }
};
