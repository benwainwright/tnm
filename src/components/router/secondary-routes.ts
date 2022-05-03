import { Routes } from "./routes";

/* eslint-disable @typescript-eslint/naming-convention */
export const secondaryRoutes: Routes = {
  "/edit-customer/:id": {
    importFn: async () => import("../../features/customers/EditCustomerPage"),
  },

  "/new-customer": {
    importFn: async () => import("../../features/customers/NewCustomerPage"),
  },
  /* eslint-enable @typescript-eslint/naming-convention */
};
