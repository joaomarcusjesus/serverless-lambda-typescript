import { Customer as CustomerDomain } from '../../../../domain/models/customer';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerMapper {
  static ToDomain(entity: CustomerEntity): CustomerDomain {
    return new CustomerDomain({
      uuid: entity.id,
      first_name: entity.first_name,
      last_name: entity.last_name,
      email: entity.email,
      phone: entity.phone,
    });
  }
}
