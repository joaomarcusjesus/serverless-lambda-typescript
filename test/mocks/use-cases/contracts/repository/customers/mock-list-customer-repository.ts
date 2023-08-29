import { ListCustomerRepository } from '@/use-cases/contracts/repository';
import { mockCustomer } from '../../../../domain/models/customer-mock';

export class MockListCustomerRepository implements ListCustomerRepository {
  async list(
    _input: ListCustomerRepository.Input,
  ): Promise<ListCustomerRepository.Output> {
    return [mockCustomer()];
  }
}
