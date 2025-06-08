import { CustomersController, SignInController } from '../api/controllers';
import { test as base } from './businessSteps.fixture';

interface ISalesPortalControllers {
  customersController: CustomersController;
  signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({request}, use) => {
    await use(new CustomersController(request));
  },
  signInController: async ({request}, use) => {
    await use(new SignInController(request));
  },
});

export { expect } from '@playwright/test';