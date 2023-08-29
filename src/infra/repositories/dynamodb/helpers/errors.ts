export class ConnectionNotFoundError extends Error {
  constructor() {
    super('No connection was found');
    this.name = 'ConnectionNotFoundError';
  }
}

export class TransactionNotFoundError extends Error {
  constructor() {
    super('No transaction was found');
    this.name = 'TransactionNotFoundError';
  }
}

export class EntityNotFound extends Error {
  constructor() {
    super('No entity was found');
    this.name = 'EntityNotFound';
  }
}

export class PersistError extends Error {
  constructor() {
    super('Not persisted');
    this.name = 'PersistError';
  }
}
