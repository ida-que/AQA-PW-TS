import { MAIN_METRICS } from "../../data/home";
import { IMainMetricsValues, MetricTypeMap } from "../../types";
import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
    readonly title = this.page.locator('.welcome-text');

    readonly ordersThisYear = this.page.locator('#total-orders-container .card-text');
    readonly newCustomers = this.page.locator('#total-customers-container .card-text');
    readonly canceledOrders = this.page.locator('#canceled-orders-container .card-text');
    readonly totalRevenue = this.page.locator('#total-revenue-container .card-text');
    readonly avgOrderValue = this.page.locator('#avg-orders-value-container .card-text');

    readonly uniqueElement = this.title;

    async getMainMetricsValues(): Promise<IMainMetricsValues> {
    const [ordersThisYear, newCustomers, canceledOrders, totalRevenue, avgOrderValue] = await Promise.all([
        this.getMetricsValueByName(MAIN_METRICS.OrdersThisYear),
        this.getMetricsValueByName(MAIN_METRICS.NewCustomers),
        this.getMetricsValueByName(MAIN_METRICS.CanceledOrders),
        this.getMetricsValueByName(MAIN_METRICS.TotalRevenue),
        this.getMetricsValueByName(MAIN_METRICS.AvgOrderValue),
        ]);
    return {
      ordersThisYear,
      newCustomers,
      canceledOrders,
      totalRevenue,
      avgOrderValue,
    };
  }
  async getMetricsValueByName<T extends keyof MetricTypeMap>(name: T): Promise<MetricTypeMap[T]> {
    let value;
    switch (name) {
        case MAIN_METRICS.OrdersThisYear:
            value = +(await this.ordersThisYear.innerText());
            break;
        case MAIN_METRICS.NewCustomers:
            value = +(await this.newCustomers.innerText());
            break;
        case MAIN_METRICS.CanceledOrders:
            value = +(await this.canceledOrders.innerText());
            break;
        case MAIN_METRICS.TotalRevenue:
            value = await this.totalRevenue.innerText();
            break;
        case MAIN_METRICS.AvgOrderValue:
            value = await this.avgOrderValue.innerText();
            break;
        default:
            throw new Error(`Unknown metric name: ${name}`);
    }
    return value as MetricTypeMap[T];
}
  }
