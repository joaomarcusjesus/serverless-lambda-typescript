export abstract class CreateCustomerRepository {
  abstract create(
    input: CreateCustomerRepository.Input,
  ): Promise<CreateCustomerRepository.Output>;
}

export namespace CreateCustomerRepository {
  export type Input = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  export type Output = void;
}
