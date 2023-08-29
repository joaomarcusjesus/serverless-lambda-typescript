import {
  UpdateCustomer,
  UpdateCustomerInput,
  UpdateCustomerOutput,
} from '../../../use-cases/customers';
import { Controller } from '../../../presentation/contracts/controller';
import { HttpResponse, noContent } from '../../../presentation/helpers/http';

type HttpRequest = UpdateCustomerInput;
type Model = UpdateCustomerOutput;

export class UpdateCustomerController extends Controller {
  constructor(private readonly service: UpdateCustomer) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.service.execute(httpRequest);
    return noContent();
  }
}
