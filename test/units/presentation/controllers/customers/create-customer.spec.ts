import { noContent } from '@/presentation/helpers/http';
import { CreateCustomer } from '@/use-cases/customers';
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer';
import { CreateCustomerRepository } from '@/use-cases/contracts/repository';
import { mockHttpCustomer } from '../../../../mocks/http/customers/create-customer';

describe('CreateCustomerController', () => {
  let useCases: CreateCustomer;
  let controller: CreateCustomerController;
  let repository: CreateCustomerRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    };

    useCases = new CreateCustomer(repository);
    controller = new CreateCustomerController(useCases);
  });

  it('should return a customer when service success', async () => {
    // Set
    const httpRequest = mockHttpCustomer();
    jest.spyOn(useCases, 'execute').mockResolvedValue();

    // Actions
    const response = await controller.perform(httpRequest);

    // Assertions
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
    expect(response).toEqual(noContent());
  });

  it('should throw an error when service fails', async () => {
    // Set
    const httpRequest = mockHttpCustomer();
    const mockError = new Error('Something went wrong');
    jest.spyOn(useCases, 'execute').mockRejectedValue(mockError);

    // Assertions && Actions
    await expect(controller.perform(httpRequest)).rejects.toThrowError(mockError);
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
  });
});
