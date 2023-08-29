import { CustomerRepository } from '@/infra/repositories/dynamodb/customers/customer.repository';
import { mockDynamodbList } from '../../../../../mocks/infra/repositories/dynamodb/customers/mock-dynamodb';
import { mockCustomer } from '../../../../../mocks/domain/models/customer-mock';
import { CustomerMapper } from '@/infra/repositories/dynamodb/mappers/customer.mapper';
import IDynamoDBClient from '@/infra/repositories/dynamodb/helpers/dynamodb-client';
import { mockHttpCustomer } from '../../../../../mocks/http/customers/create-customer';

// jest.mock('@/infra/repositories/dynamodb/helpers/dynamodb-client');

describe('CustomerRepository', () => {
  let repository: CustomerRepository;
  let mockScan: jest.Mock;
  let mockPut: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    mockScan = jest.fn();
    mockPut = jest.fn();
    mockUpdate = jest.fn();
    mockDelete = jest.fn();

    const mockDocumentClient = {
      scan: mockScan,
      put: mockPut,
      update: mockUpdate,
      delete: mockDelete,
    };

    const MockDynamoDBClient: IDynamoDBClient = {
      getClient: jest.fn().mockReturnValue(mockDocumentClient),
    };
    repository = new CustomerRepository(MockDynamoDBClient);
    repository.tableName = 'customers';
  });

  describe('list customers', () => {
    it('should return a list of customers', async () => {
      // Set
      const mockCustomers = mockDynamodbList();
      const expected = [mockCustomer()];
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue(mockCustomers),
      });

      // Actions
      const result = await repository.list();

      // Assertions
      expect(result).toEqual(expected);
    });

    it('should items empty result', async () => {
      // Set
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      });

      // Actions
      const result = await repository.list();

      // Assertions
      expect(result).toEqual([]);
    });

    it('should promise empty result', async () => {
      // Set
      mockScan.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue({}) });

      // Actions
      const result = await repository.list();

      // Assertions
      expect(result).toEqual([]);
    });

    it('should items is null', async () => {
      // Set
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: null }),
      });

      // Actions
      const result = await repository.list();

      // Assertions
      expect(result).toEqual([]);
    });

    it('should map entities to domain objects', async () => {
      // Set
      const mockEntities = [mockDynamodbList()];
      const mockCustomerDomain = mockCustomer();
      CustomerMapper.ToDomain = jest.fn().mockReturnValue(mockCustomerDomain);
      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: mockEntities }),
      });

      // Actions
      const result = await repository.list();

      // Assertions
      expect(result).toEqual([mockCustomerDomain]);
    });

    it('should error in scan operation', async () => {
      // Set
      const mockError = new Error();
      mockScan.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(mockError) });

      // Actions and Assertions
      await expect(repository.list()).rejects.toThrow(mockError);
    });

    it('should return a list of customers matching the name search', async () => {
      // Set
      const searchName = 'John doe';
      const mockCustomers = [mockCustomer(), mockCustomer()];
      const mockEntities = mockCustomers.map((customer) =>
        CustomerMapper.ToDomain(customer),
      );

      mockScan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: mockEntities }),
      });

      // Actions
      const result = await repository.list({ search: searchName });

      // Assertions
      const expected = mockCustomers.map((customer) => CustomerMapper.ToDomain(customer));
      expect(result).toEqual(expected);
      expect(mockScan).toHaveBeenCalledWith({
        TableName: repository.tableName,
        /* eslint-disable max-len */
        FilterExpression:
          'contains(id, :search) OR contains(first_name, :search) OR contains(last_name, :search) OR contains(email, :search) OR contains(phone, :search)',
        ExpressionAttributeValues: {
          ':search': searchName,
        },
      });
    });
  });
  describe('create customer', () => {
    it('should create a customer successfully', async () => {
      // Set
      const input = mockHttpCustomer();
      mockPut.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue({}) });

      // Actions
      await repository.create(input);

      // Assertions
      expect(mockPut).toHaveBeenCalledWith({
        TableName: repository.tableName,
        Item: expect.objectContaining({
          ...input,
          id: expect.any(String),
        }),
      });
    });

    it('should throw an error when creation fails', async () => {
      // Set
      const input = mockHttpCustomer();
      const mockError = new Error();
      mockPut.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(mockError) });

      // Actions and Assertions
      await expect(repository.create(input)).rejects.toThrow(mockError);
    });

    it('should throw an error when creation fails', async () => {
      // Set
      const input = mockHttpCustomer();
      const mockError = new Error();
      mockPut.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(mockError) });

      // Actions and Assertions
      await expect(repository.create(input)).rejects.toThrow(mockError);
    });
  });

  describe('update customer', () => {
    it('should update a customer successfully', async () => {
      // Set
      const input = {
        ...mockHttpCustomer(),
        uuid: 'uuid',
      };
      mockUpdate.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue({}) });

      // Actions
      await repository.update(input);

      // Assertions
      expect(mockUpdate).toHaveBeenCalledWith({
        TableName: repository.tableName,
        Key: {
          id: input.uuid,
        },
        UpdateExpression:
          'set email = :email, first_name = :first_name, last_name = :last_name, phone = :phone',
        ExpressionAttributeValues: {
          ':email': input.email,
          ':first_name': input.first_name,
          ':last_name': input.last_name,
          ':phone': input.phone,
        },
        ReturnValues: 'UPDATED_NEW',
      });
    });

    it('should throw an error when update fails', async () => {
      // Set
      const input = {
        ...mockHttpCustomer(),
        uuid: 'uuid',
      };
      const mockError = new Error();
      mockUpdate.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(mockError) });

      // Actions and Assertions
      await expect(repository.update(input)).rejects.toThrow(mockError);
    });
  });

  describe('delete customer', () => {
    it('should delete a customer successfully', async () => {
      // Set
      const input = {
        uuid: 'uuid',
      };
      mockDelete.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue({}) });

      // Actions
      await repository.delete(input);

      // Assertions
      expect(mockDelete).toHaveBeenCalledWith({
        TableName: repository.tableName,
        Key: {
          id: input.uuid,
        },
      });
    });

    it('should throw an error when delete fails', async () => {
      // Set
      const input = {
        uuid: 'uuid',
      };
      const mockError = new Error();
      mockDelete.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(mockError) });

      // Actions and Assertions
      await expect(repository.delete(input)).rejects.toThrow(mockError);
    });
  });
});
