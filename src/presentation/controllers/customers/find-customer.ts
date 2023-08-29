import {
  FindCustomer,
  FindCustomerInput,
  FindCustomerOutput,
} from '../../../use-cases/customers';
import { Controller } from '../../../presentation/contracts/controller';
import { HttpResponse, ok } from '../../../presentation/helpers/http';

type HttpRequest = FindCustomerInput;
type Model = FindCustomerOutput;

export class FindCustomerController extends Controller {
  constructor(private readonly service: FindCustomer) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const customer = await this.service.execute(httpRequest);
    return ok(customer);
  }
}
