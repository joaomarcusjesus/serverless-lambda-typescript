import { FindCustomer } from '@/use-cases/customers/find-customer';
import { FindCustomerController } from '@/presentation/controllers/customers/find-customer';
import { mockCustomer } from '../../../../mocks/domain/models/customer-mock';
import { ok } from '@/presentation/helpers/http';
import { FindCustomerRepository } from '@/use-cases/contracts/repository';

describe('FindCustomerController', () => {
  let useCases: FindCustomer;
  let controller: FindCustomerController;
  let repository: FindCustomerRepository;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
    };

    useCases = new FindCustomer(repository);
    controller = new FindCustomerController(useCases);
  });

  it('should return a customer when service success', async () => {
    // Set
    const expectedCustomer = mockCustomer();
    jest.spyOn(useCases, 'execute').mockResolvedValue(expectedCustomer);
    const httpRequest = { uuid: '123' };

    // Actions
    const response = await controller.perform(httpRequest);

    // Assertions
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
    expect(response).toEqual(ok(expectedCustomer));
  });

  it('should throw an error when service fails', async () => {
    // Set
    const httpRequest = { uuid: '123' };
    const mockError = new Error('Something went wrong');
    jest.spyOn(useCases, 'execute').mockRejectedValue(mockError);

    // Assertions && Actions
    await expect(controller.perform(httpRequest)).rejects.toThrowError(mockError);
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
  });
});
