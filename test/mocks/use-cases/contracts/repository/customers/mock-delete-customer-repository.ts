import { DeleteCustomerRepository } from '@/use-cases/contracts/repository';

export class MockDeleteCustomerRepository implements DeleteCustomerRepository {
  async delete(
    _input: DeleteCustomerRepository.Input,
  ): Promise<DeleteCustomerRepository.Output> {
    return;
  }
}
