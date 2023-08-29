import { noContent } from '@/presentation/helpers/http';
import { DeleteCustomerRepository } from '@/use-cases/contracts/repository';
import { DeleteCustomer } from '@/use-cases/customers';
import { DeleteCustomerController } from '@/presentation/controllers/customers/delete-customer';

describe('DeleteCustomerController', () => {
  let useCases: DeleteCustomer;
  let controller: DeleteCustomerController;
  let repository: DeleteCustomerRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    };

    useCases = new DeleteCustomer(repository);
    controller = new DeleteCustomerController(useCases);
  });

  it('should return a customer when service success', async () => {
    // Set
    jest.spyOn(useCases, 'execute').mockResolvedValue();
    const httpRequest = {
      uuid: '123',
    };

    // Actions
    const response = await controller.perform(httpRequest);

    // Assertions
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
    expect(response).toEqual(noContent());
  });

  it('should throw an error when service fails', async () => {
    // Set
    const httpRequest = {
      uuid: '123',
    };
    const mockError = new Error('Something went wrong');
    jest.spyOn(useCases, 'execute').mockRejectedValue(mockError);

    // Assertions && Actions
    await expect(controller.perform(httpRequest)).rejects.toThrowError(mockError);
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
  });
});
