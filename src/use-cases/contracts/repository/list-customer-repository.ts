import { Customer } from '@/domain/models/customer';

export abstract class ListCustomerRepository {
  abstract list(
    input?: ListCustomerRepository.Input,
  ): Promise<ListCustomerRepository.Output>;
}

export namespace ListCustomerRepository {
  export type Input = {
    search?: string;
  };

  export type Output = Customer[];
}
