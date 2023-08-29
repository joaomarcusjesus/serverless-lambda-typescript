import { ServerError } from '../../presentation/errors/http';

export type HttpResponse<T = any> = {
  statusCode: number;
  body: T;
};

export const ok = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body,
});

export const created = <T = any>(body?: T): HttpResponse<T> =>
  ({
    statusCode: 201,
    body,
  }) as HttpResponse<T>;

export const noContent = (): HttpResponse =>
  ({
    statusCode: 204,
    body: null,
  }) as HttpResponse;

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined),
});

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  body: error,
});

export const appError = (error: Error): HttpResponse<Error> =>
  ({
    statusCode: 400,
    body: error,
  }) as HttpResponse<Error>;
