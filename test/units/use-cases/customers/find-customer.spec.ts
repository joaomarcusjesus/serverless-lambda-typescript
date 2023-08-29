import { FindCustomer } from '@/use-cases/customers';
import { MockFindCustomerRepository } from '../../../mocks/use-cases/contracts/repository/customers/mock-find-customer-repository';

describe('FindCustomerUseCases', () => {
  let useCases: FindCustomer;
  let repository: MockFindCustomerRepository;

  beforeEach(() => {
    repository = new MockFindCustomerRepository();
    useCases = new FindCustomer(repository);
  });

  it('should find a customer by uuid', async () => {
    // Set
    const input = {
      uuid: 'uuid',
    };

    // Actions
    const result = await useCases.execute(input);

    // Assertions
    expect(result).toBeDefined();
    expect(result.uuid).toBe(input.uuid);
  });
});
