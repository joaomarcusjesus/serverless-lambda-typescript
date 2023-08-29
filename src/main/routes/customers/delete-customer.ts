import { CustomerRepository } from '../../../infra/repositories/dynamodb/customers/customer.repository';
import { DeleteCustomer } from '../../../use-cases/customers/delete-customer';
import { DeleteCustomerController } from '../../../presentation/controllers/customers/delete-customer';
import { responseDecorator } from '../../../main/decorator/response';
import { LambdaEvent } from '../../../infra/lambda/lambda.interface';
import { DynamoDBClient } from '../../../infra/repositories/dynamodb/helpers/connection';

export const router = async (event: LambdaEvent): Promise<any> => {
  try {
    const repository = new CustomerRepository(new DynamoDBClient());
    const service = new DeleteCustomer(repository);
    const controller = new DeleteCustomerController(service);

    const segments = event.path.split('/').filter((segment) => segment !== '');
    const customerId = segments[1];

    return await controller.perform({
      uuid: customerId,
    });
  } catch (error) {
    return responseDecorator(500, { error });
  }
};
