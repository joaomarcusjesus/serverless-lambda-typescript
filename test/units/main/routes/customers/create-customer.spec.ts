import { router } from '@/main/routes/customers/create-customer';
import { LambdaEvent } from '@/infra/lambda/lambda.interface';
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer';
import { mockHttpCustomer } from '../../../../mocks/http/customers/create-customer';

jest.mock('@/infra/repositories/dynamodb/helpers/connection');
jest.mock('@/infra/repositories/dynamodb/customers/customer.repository');
jest.mock('@/use-cases/customers/create-customer');
jest.mock('@/presentation/controllers/customers/create-customer');

describe('Create customer router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call controller with the correct input', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'POST',
      path: '/customers',
      body: JSON.stringify(mockHttpCustomer()),
    };
    jest.spyOn(CreateCustomerController.prototype, 'perform').mockResolvedValue({
      statusCode: 204,
      body: undefined,
    });

    // Actions
    const result = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(result.statusCode).toBe(204);
  });

  it('should handle errors and return a 500 response', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'POST',
      path: '/customers',
      body: JSON.stringify(mockHttpCustomer()),
    };
    const mockError = new Error('Something went wrong');
    jest
      .spyOn(CreateCustomerController.prototype, 'perform')
      .mockRejectedValue(mockError);

    // Actions
    const response = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(mockError.message);
  });
});
