import { ListCustomer } from '@/use-cases/customers/list-customer';
import { mockCustomer } from '../../../mocks/domain/models/customer-mock';
import { MockListCustomerRepository } from '../../../mocks/use-cases/contracts/repository/customers/mock-list-customer-repository';

describe('ListCustomerUseCases', () => {
  let useCases: ListCustomer;
  let repository: MockListCustomerRepository;

  beforeEach(() => {
    repository = new MockListCustomerRepository();
    useCases = new ListCustomer(repository);
  });

  it('should list customers', async () => {
    // Set
    const expected = [mockCustomer()];
    const listSpy = jest.spyOn(repository, 'list');

    // Actions
    const result = await useCases.execute({});

    // Assertions
    expect(result).toBeDefined();
    expect(result).toStrictEqual(expected);
    expect(listSpy).toHaveBeenCalledTimes(1);
  });
});
