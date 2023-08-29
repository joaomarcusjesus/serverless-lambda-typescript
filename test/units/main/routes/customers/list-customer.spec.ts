import { router } from '@/main/routes/customers/list-customer';
import { LambdaEvent } from '@/infra/lambda/lambda.interface';
import { ListCustomerController } from '@/presentation/controllers/customers/list-customer';

jest.mock('@/infra/repositories/dynamodb/helpers/connection');
jest.mock('@/infra/repositories/dynamodb/customers/customer.repository');
jest.mock('@/use-cases/customers/list-customer');
jest.mock('@/presentation/controllers/customers/list-customer');

describe('List customer router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call controller with the correct input', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'GET',
      path: '/customers',
    };
    jest.spyOn(ListCustomerController.prototype, 'perform').mockResolvedValue({
      statusCode: 200,
      body: [],
    });

    // Actions
    const result = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(result.statusCode).toBe(200);
  });

  it('should handle errors and return a 500 response', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'GET',
      path: '/customers',
    };
    const mockError = new Error('Something went wrong');
    jest.spyOn(ListCustomerController.prototype, 'perform').mockRejectedValue(mockError);

    // Actions
    const response = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(response.statusCode).toBe(500);
  });
});
