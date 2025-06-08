import { CustomersController, SignInController } from '../api/controllers';
import { test as base } from './businessSteps.fixture';

interface ISalesPortalControllers {
  customersController: CustomersController;
  signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({}, use) => {
    await use(new CustomersController());
  },
  signInController: async ({}, use) => {
    await use(new SignInController());
  },
});

export { expect } from '@playwright/test';