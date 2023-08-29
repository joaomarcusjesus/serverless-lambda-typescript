import { CreateCustomer } from '@/use-cases/customers';
import { MockCreateCustomerRepository } from '../../../mocks/use-cases/contracts/repository/customers/mock-create-customer-repository';
import { mockHttpCustomer } from '../../../mocks/http/customers/create-customer';

describe('CreateCustomerUseCases', () => {
  let useCases: CreateCustomer;
  let repository: MockCreateCustomerRepository;

  beforeEach(() => {
    repository = new MockCreateCustomerRepository();
    useCases = new CreateCustomer(repository);
  });

  it('should create a customer', async () => {
    // Set
    const input = mockHttpCustomer();
    const createSpy = jest.spyOn(repository, 'create');

    // Actions
    await useCases.execute(input);

    // Assertions
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(input);
  });
});
