import { DeleteCustomer } from '@/use-cases/customers';
import { MockDeleteCustomerRepository } from '../../../mocks/use-cases/contracts/repository/customers/mock-delete-customer-repository';

describe('DeleteCustomerUseCases', () => {
  let useCases: DeleteCustomer;
  let repository: MockDeleteCustomerRepository;

  beforeEach(() => {
    repository = new MockDeleteCustomerRepository();
    useCases = new DeleteCustomer(repository);
  });

  it('should delete custoemr by uuid', async () => {
    // Set
    const input = {
      uuid: 'uuid',
    };
    const deleteSpy = jest.spyOn(repository, 'delete');

    // Actions
    await useCases.execute(input);

    // Assertions
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(input);
  });
});
