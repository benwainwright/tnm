export interface Item {
  name: string;
  quantity: number;
}

export interface Delivery {
  deliveryDay: string;
  items: Item[];
  extras: Item[];
}

export interface CustomerPlan {
  deliveries: Delivery[];
}

export interface PlannerConfig {
  planLabels: string[];
  extrasLabels: string[];
  defaultDeliveryDays: string[];
}