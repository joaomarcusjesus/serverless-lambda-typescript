export abstract class DeleteCustomerRepository {
  abstract delete(
    input: DeleteCustomerRepository.Input,
  ): Promise<DeleteCustomerRepository.Output>;
}

export namespace DeleteCustomerRepository {
  export type Input = {
    uuid: string;
  };

  export type Output = void;
}
