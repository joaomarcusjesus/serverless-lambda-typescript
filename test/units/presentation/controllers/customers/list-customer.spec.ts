import { mockCustomer } from '../../../../mocks/domain/models/customer-mock';
import { ok } from '@/presentation/helpers/http';
import { ListCustomer } from '@/use-cases/customers/list-customer';
import { ListCustomerController } from '@/presentation/controllers/customers/list-customer';
import { ListCustomerRepository } from '@/use-cases/contracts/repository';

describe('ListCustomerController', () => {
  let useCases: ListCustomer;
  let controller: ListCustomerController;
  let repository: ListCustomerRepository;

  beforeEach(() => {
    repository = {
      list: jest.fn(),
    };

    useCases = new ListCustomer(repository);
    controller = new ListCustomerController(useCases);
  });

  it('should return a customer when service success', async () => {
    // Set
    jest.spyOn(useCases, 'execute').mockResolvedValue([mockCustomer()]);
    const expectedCustomer = [mockCustomer()];

    // Actions
    const response = await controller.perform({});

    // Assertions
    expect(useCases.execute).toHaveBeenCalledWith({});
    expect(response).toEqual(ok(expectedCustomer));
  });

  it('should throw an error when service fails', async () => {
    // Set
    const mockError = new Error('Something went wrong');
    jest.spyOn(useCases, 'execute').mockRejectedValue(mockError);

    // Assertions && Actions
    await expect(controller.perform({})).rejects.toThrowError(mockError);
    expect(useCases.execute).toHaveBeenCalledWith({});
  });
});
