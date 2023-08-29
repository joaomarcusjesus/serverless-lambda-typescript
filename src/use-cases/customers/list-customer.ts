import { Customer } from '../../domain/models/customer';
import { ListCustomerRepository } from '../contracts/repository/list-customer-repository';

export type ListCustomerInput = {
  search?: string;
};
export type ListCustomerOutput = Customer[];

export class ListCustomer {
  constructor(private readonly repository: ListCustomerRepository) {}

  public async execute(input: ListCustomerInput): Promise<ListCustomerOutput> {
    return await this.repository.list({ search: input.search });
  }
}
