export abstract class UpdateCustomerRepository {
  abstract update(
    input: UpdateCustomerRepository.Input,
  ): Promise<UpdateCustomerRepository.Output>;
}

export namespace UpdateCustomerRepository {
  export type Input = {
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  export type Output = void;
}
