import { Routes } from "./routes";

export const secondaryRoutes: Routes = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/edit-customer/:id": {
    importFn: async () => import("../../features/customers/EditCustomerPage"),
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/new-customer": {
    importFn: async () => import("../../features/customers/NewCustomerPage"),
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/algorithm": {
    importFn: async () => import("../../features/algorithm/AlgorithmPage"),
  },
};
