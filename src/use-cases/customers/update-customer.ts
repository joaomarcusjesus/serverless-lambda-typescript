import { FindCustomerRepository } from '../contracts/repository';
import { UpdateCustomerRepository } from '../contracts/repository/update-customer-repository';

export type UpdateCustomerInput = {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};
export type UpdateCustomerOutput = void;

export class UpdateCustomer {
  constructor(
    private readonly updateCustomerRepository: UpdateCustomerRepository,
    private readonly findCustomerRepository: FindCustomerRepository,
  ) {}

  public async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput> {
    const customerOld = await this.findCustomerRepository.find({ uuid: input.uuid });

    const customerNew: UpdateCustomerRepository.Input = {
      ...customerOld,
      ...input,
    };

    await this.updateCustomerRepository.update(customerNew);
  }
}
