import { APIRequestContext } from '@playwright/test';
import { apiConfig } from '../../config/apiConfig';
import { ICredentials, ILoginResponse, IRequestOptions } from '../../types';
import { RequestApi } from '../apiClients/request';

export class SignInController {
  private request: RequestApi;

  constructor(context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  async login(body: ICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.LOGIN,
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      data: body,
    };
    return await this.request.send<ILoginResponse>(options);
  }
}