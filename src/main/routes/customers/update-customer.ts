import { CustomerRepository } from '../../../infra/repositories/dynamodb/customers/customer.repository';
import { UpdateCustomer } from '../../../use-cases/customers/update-customer';
import { UpdateCustomerController } from '../../../presentation/controllers/customers/update-customer';
import { responseDecorator } from '../../../main/decorator/response';
import { LambdaEvent } from '../../../infra/lambda/lambda.interface';
import { DynamoDBClient } from '../../../infra/repositories/dynamodb/helpers/connection';

export const router = async (event: LambdaEvent): Promise<any> => {
  try {
    const segments = event.path.split('/').filter((segment) => segment !== '');
    const customerId = segments[1];

    const repository = new CustomerRepository(new DynamoDBClient());
    const service = new UpdateCustomer(repository, repository);
    const controller = new UpdateCustomerController(service);

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

    return await controller.perform({
      ...input,
      uuid: customerId,
    });
  } catch (error) {
    return responseDecorator(500, { error });
  }
};
