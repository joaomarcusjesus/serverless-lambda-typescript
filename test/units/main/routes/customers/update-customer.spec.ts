import { router } from '@/main/routes/customers/update-customer';
import { LambdaEvent } from '@/infra/lambda/lambda.interface';
import { UpdateCustomerController } from '@/presentation/controllers/customers/update-customer';
import { mockHttpCustomer } from '../../../../mocks/http/customers/create-customer';

jest.mock('@/infra/repositories/dynamodb/helpers/connection');
jest.mock('@/infra/repositories/dynamodb/customers/customer.repository');
jest.mock('@/use-cases/customers/update-customer');
jest.mock('@/presentation/controllers/customers/update-customer');

describe('Update customer router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call controller with the correct input', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'POST',
      path: '/customers/someCustomerId',
      body: JSON.stringify(mockHttpCustomer()),
    };
    const expected = {
      uuid: 'someCustomerId',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '5583999351425',
    };
    const controllerPerformSpy = jest
      .spyOn(UpdateCustomerController.prototype, 'perform')
      .mockResolvedValue({
        statusCode: 204,
        body: undefined,
      });

    // Actions
    const result = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(result.statusCode).toBe(204);
    expect(controllerPerformSpy).toHaveBeenCalledWith(expected);
  });

  it('should handle errors and return a 500 response', async () => {
    // Set
    const mockLambdaEvent = {
      httpMethod: 'POST',
      path: '/customers/someCustomerId',
      body: JSON.stringify(mockHttpCustomer()),
    };
    const mockError = new Error('Something went wrong');
    jest
      .spyOn(UpdateCustomerController.prototype, 'perform')
      .mockRejectedValue(mockError);

    // Actions
    const response = await router(mockLambdaEvent as LambdaEvent);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(mockError.message);
  });
});
