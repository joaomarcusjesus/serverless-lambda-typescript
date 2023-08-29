import { UpdateCustomer } from '@/use-cases/customers/update-customer';
import { MockFindCustomerRepository } from '../../../mocks/use-cases/contracts/repository/customers/mock-find-customer-repository';
import { MockUpdateCustomerRepository } from '../../../mocks/use-cases/contracts/repository/customers/mock-update-customer-repository';
import { mockHttpCustomer } from '../../../mocks/http/customers/create-customer';

describe('UpdateCustomerUseCases', () => {
  let useCases: UpdateCustomer;
  let repositoryUpdateRepository: MockUpdateCustomerRepository;
  let repositoryFindRepository: MockFindCustomerRepository;

  beforeEach(() => {
    repositoryUpdateRepository = new MockUpdateCustomerRepository();
    repositoryFindRepository = new MockFindCustomerRepository();
    useCases = new UpdateCustomer(repositoryUpdateRepository, repositoryFindRepository);
  });

  it('should update a customer', async () => {
    // Set
    const input = {
      ...mockHttpCustomer(),
      uuid: 'uuid',
    };
    const udpateSpy = jest.spyOn(repositoryUpdateRepository, 'update');
    const findSpy = jest.spyOn(repositoryFindRepository, 'find');

    // Actions
    await useCases.execute(input);

    // Assertions
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith({ uuid: input.uuid });
    expect(udpateSpy).toHaveBeenCalledTimes(1);
    expect(udpateSpy).toHaveBeenCalledWith(input);
  });
});
