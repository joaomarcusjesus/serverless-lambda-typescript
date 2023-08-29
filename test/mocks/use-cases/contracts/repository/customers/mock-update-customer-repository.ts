import { UpdateCustomerRepository } from '@/use-cases/contracts/repository';

export class MockUpdateCustomerRepository implements UpdateCustomerRepository {
  async update(
    _input: UpdateCustomerRepository.Input,
  ): Promise<UpdateCustomerRepository.Output> {
    return;
  }
}
