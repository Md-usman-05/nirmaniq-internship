import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { AppExceptionFilter } from './app-exception.filter';

describe('AppExceptionFilter', () => {
  const runFilter = (exception: Error) => {
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const request = { url: '/projects' };
    const host = {
      switchToHttp: () => ({
        getResponse: () => response,
        getRequest: () => request,
      }),
    } as unknown as ArgumentsHost;

    new AppExceptionFilter().catch(exception, host);
    return response;
  };

  it('maps authentication errors to 451', () => {
    const response = runFilter(new UnauthorizedException());

    expect(response.status).toHaveBeenCalledWith(451);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 451, path: '/projects' }),
    );
  });

  it('maps authorization errors to 453', () => {
    const response = runFilter(new ForbiddenException());

    expect(response.status).toHaveBeenCalledWith(453);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 453, path: '/projects' }),
    );
  });
});
