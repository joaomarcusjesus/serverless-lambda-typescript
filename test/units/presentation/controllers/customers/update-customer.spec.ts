import { UpdateCustomerController } from '@/presentation/controllers/customers/update-customer';
import { noContent } from '@/presentation/helpers/http';
import {
  FindCustomerRepository,
  UpdateCustomerRepository,
} from '@/use-cases/contracts/repository';
import { UpdateCustomer } from '@/use-cases/customers';
import { mockHttpCustomer } from '../../../../mocks/http/customers/create-customer';

describe('UpdateCustomerController', () => {
  let useCases: UpdateCustomer;
  let controller: UpdateCustomerController;
  let updateCustomerRepository: UpdateCustomerRepository;
  let findCustomerRepository: FindCustomerRepository;

  beforeEach(() => {
    updateCustomerRepository = {
      update: jest.fn(),
    };

    findCustomerRepository = {
      find: jest.fn(),
    };

    useCases = new UpdateCustomer(updateCustomerRepository, findCustomerRepository);
    controller = new UpdateCustomerController(useCases);
  });

  it('should return a customer when service success', async () => {
    // Set
    jest.spyOn(useCases, 'execute').mockResolvedValue();
    const httpRequest = {
      ...mockHttpCustomer(),
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
      ...mockHttpCustomer(),
      uuid: '123',
    };
    const mockError = new Error('Something went wrong');
    jest.spyOn(useCases, 'execute').mockRejectedValue(mockError);

    // Assertions && Actions
    await expect(controller.perform(httpRequest)).rejects.toThrowError(mockError);
    expect(useCases.execute).toHaveBeenCalledWith(httpRequest);
  });
});
