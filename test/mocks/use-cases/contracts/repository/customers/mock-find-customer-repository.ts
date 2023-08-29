import { FindCustomerRepository } from '@/use-cases/contracts/repository';
import { mockCustomer } from '../../../../domain/models/customer-mock';

export class MockFindCustomerRepository implements FindCustomerRepository {
  async find(
    _input: FindCustomerRepository.Input,
  ): Promise<FindCustomerRepository.Output> {
    return mockCustomer();
  }
}
