import { CreateCustomerRepository } from '@/use-cases/contracts/repository';

export class MockCreateCustomerRepository implements CreateCustomerRepository {
  async create(
    _input: CreateCustomerRepository.Input,
  ): Promise<CreateCustomerRepository.Output> {
    return;
  }
}
