export const responseDecorator = (statusCode: number, data: any) => {
  return {
    statusCode: statusCode,
    message: 'Something went wrong',
    body: JSON.stringify({ data }),
  };
};
