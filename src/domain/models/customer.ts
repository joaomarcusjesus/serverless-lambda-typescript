type CustomerData = {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export class Customer {
  public uuid: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;

  constructor(data: CustomerData) {
    this.uuid = data.uuid;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
  }
}
