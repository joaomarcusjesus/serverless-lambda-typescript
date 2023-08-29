import { HttpResponse } from '../../presentation/helpers/http';

export abstract class Controller {
  abstract perform(httpRequest: any): Promise<HttpResponse>;
}
