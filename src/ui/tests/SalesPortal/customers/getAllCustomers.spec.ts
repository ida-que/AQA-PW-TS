import test, { expect } from "@playwright/test";
import { STATUS_CODES } from "../../../../data/statusCodes.data";
import { apiConfig } from "../../../../config/apiConfig";
import { USER_LOGIN, USER_PASSWORD } from "../../../../config/environment";
import { generateCustomerData } from "../../../../data/customers/generateCustomer.data";
import { allCustomersSchema } from "../../../../data/schemas";
import { ICustomerFromResponse } from "../../../../types";
import { validateSchema } from "../../../../utils/validations/schemaValidation.utils";

test.describe('[API] [Sales Portal] [Customers]', () => {
  test('Should get all customers w/o filters', async ({ request }) => {
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        'content-type': 'application/json',
      },
    });

    const token = loginResponse.headers()['authorization'];

    const customerData = generateCustomerData();
    const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
      data: customerData,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const customerBody = await customerResponse.json();
    const customerId = customerBody.Customer._id;
    expect(customerResponse.status()).toBe(STATUS_CODES.CREATED);

    const allCustomersResponse = await request.get(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const allCustomersBody = await allCustomersResponse.json();
    const customerFromResponse = allCustomersBody.Customers.find(
      (customer: ICustomerFromResponse) => customer._id === customerId,
    );

    validateSchema(allCustomersSchema, allCustomersBody);
    expect.soft(allCustomersResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(customerFromResponse).toEqual(customerBody.Customer);
    expect.soft(allCustomersBody.ErrorMessage).toBe(null);
    expect.soft(allCustomersBody.IsSuccess).toBe(true);

    const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
  });
});