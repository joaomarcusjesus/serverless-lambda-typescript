import { CustomerRepository } from '../../../infra/repositories/dynamodb/customers/customer.repository';
import { FindCustomer } from '../../../use-cases/customers/find-customer';
import { FindCustomerController } from '../../../presentation/controllers/customers/find-customer';
import { responseDecorator } from '../../../main/decorator/response';
import { LambdaEvent } from '../../../infra/lambda/lambda.interface';
import { DynamoDBClient } from '../../../infra/repositories/dynamodb/helpers/connection';

export const router = async (event: LambdaEvent): Promise<any> => {
  try {
    const segments = event.path.split('/').filter((segment) => segment !== '');
    const customerId = segments[1];

    const repository = new CustomerRepository(new DynamoDBClient());
    const service = new FindCustomer(repository);
    const controller = new FindCustomerController(service);

    const response = await controller.perform({
      uuid: customerId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.body }),
    };
  } catch (error) {
    return responseDecorator(500, { error });
  }
};
