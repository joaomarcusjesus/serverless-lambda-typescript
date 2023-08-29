import { CreateCustomerRepository } from '../contracts/repository/create-customer-repository';

export type CreateCustomerInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};
export type CreateCustomerOutput = void;

export class CreateCustomer {
  constructor(private readonly repository: CreateCustomerRepository) {}

  public async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
    await this.repository.create(input);
  }
}
