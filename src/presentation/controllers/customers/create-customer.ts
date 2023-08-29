import { HttpResponse, noContent } from '../../../presentation/helpers/http';
import {
  CreateCustomer,
  CreateCustomerInput,
  CreateCustomerOutput,
} from '../../../use-cases/customers/create-customer';
import { Controller } from '../../../presentation/contracts/controller';

type HttpRequest = CreateCustomerInput;
type Model = CreateCustomerOutput;

export class CreateCustomerController extends Controller {
  constructor(private readonly service: CreateCustomer) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.service.execute(httpRequest);
    return noContent();
  }
}
