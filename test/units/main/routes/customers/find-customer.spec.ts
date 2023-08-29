import { router } from '@/main/routes/customers/find-customer';
import { FindCustomerController } from '@/presentation/controllers/customers/find-customer';
import { LambdaEvent } from '@/infra/lambda/lambda.interface';

jest.mock('@/infra/repositories/dynamodb/helpers/connection');
jest.mock('@/infra/repositories/dynamodb/customers/customer.repository');
jest.mock('@/use-cases/customers/find-customer');
jest.mock('@/presentation/controllers/customers/find-customer');

describe('Find customer router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call controller with the correct input', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'GET',
      path: '/customers/someCustomerId',
    };
    const controllerPerformSpy = jest.spyOn(FindCustomerController.prototype, 'perform');

    // Actions
    await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(controllerPerformSpy).toHaveBeenCalledWith({ uuid: 'someCustomerId' });
  });

  it('should handle errors and return a 500 response', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'GET',
      path: '/customers/someCustomerId',
    };
    const mockError = new Error('Something went wrong');
    const controllerPerformSpy = jest.spyOn(FindCustomerController.prototype, 'perform');
    controllerPerformSpy.mockRejectedValue(mockError);

    // Actions
    const response = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(mockError.message);
  });
});
