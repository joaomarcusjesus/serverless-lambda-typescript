import { Customer } from '../../../domain/models/customer';

export abstract class FindCustomerRepository {
  abstract find(
    input: FindCustomerRepository.Input,
  ): Promise<FindCustomerRepository.Output>;
}

export namespace FindCustomerRepository {
  export type Input = {
    uuid: string;
  };

  export type Output = Customer;
}
