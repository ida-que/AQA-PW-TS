import { DEFAULT_METRICS_RESPONSE, MAIN_METRICS } from 'data/home';
import { test, expect } from 'fixtures';
import numeral from 'numeral';

interface IMetricTestData {
  metricName: MAIN_METRICS;
  expected: number | string;
}

const metricsTestData: IMetricTestData[] = [
  {
    metricName: MAIN_METRICS.OrdersThisYear,
    expected: DEFAULT_METRICS_RESPONSE.Metrics.orders.totalOrders,
  },
  {
    metricName: MAIN_METRICS.NewCustomers,
    expected: DEFAULT_METRICS_RESPONSE.Metrics.customers.totalNewCustomers,
  },
  {
    metricName: MAIN_METRICS.CanceledOrders,
    expected: DEFAULT_METRICS_RESPONSE.Metrics.orders.totalCanceledOrders,
  },
  {
    metricName: MAIN_METRICS.TotalRevenue,
    expected: `$${numeral(DEFAULT_METRICS_RESPONSE.Metrics.orders.totalRevenue).format('0.0a')}`,
  },
  {
    metricName: MAIN_METRICS.AvgOrderValue,
    expected: `$${numeral(DEFAULT_METRICS_RESPONSE.Metrics.orders.averageOrderValue).format('0.0a')}`,
  },
];

test.describe('[UI] [Home] Main Metrics', () => {
  metricsTestData.forEach(({ metricName, expected }) => {
    test(`Should display correct '${metricName}' metric`, async ({ loginAsLocalUser, homePage, mock }) => {
      await mock.metrics(DEFAULT_METRICS_RESPONSE);
      await loginAsLocalUser();
      const actual = await homePage.getMetricsValueByName(metricName);
      expect(actual).toBe(expected);
    });
  });
});