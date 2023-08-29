import { Customer } from '../../domain/models/customer';
import { FindCustomerRepository } from '../contracts/repository/find-customer-repository';

export type FindCustomerInput = {
  uuid: string;
};
export type FindCustomerOutput = Customer;

export class FindCustomer {
  constructor(private readonly repository: FindCustomerRepository) {}

  public async execute(input: FindCustomerInput): Promise<FindCustomerOutput> {
    return await this.repository.find({ uuid: input.uuid });
  }
}
