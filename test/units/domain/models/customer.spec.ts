import { mockCustomer } from '../../../mocks/domain/models/customer-mock';
import { Customer } from '@/domain/models/customer';

describe('Customer domain', () => {
  const customerData = mockCustomer();

  it('should create a Customer instance', () => {
    expect(new Customer(customerData)).toBeDefined();
  });

  it('should correctly initialize Customer properties', () => {
    const instance = new Customer(customerData);
    expect(instance.uuid).toBe(customerData.uuid);
    expect(instance.email).toBe(customerData.email);
    expect(instance.phone).toBe(customerData.phone);
    expect(instance.first_name).toBe(customerData.first_name);
    expect(instance.last_name).toBe(customerData.last_name);
  });
});
