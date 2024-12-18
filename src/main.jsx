import { createRoot } from "react-dom/client";
import * as bootstrap from "bootstrap";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Cart,
  Contact,
  Error,
  Home,
  Root,
  Product,
  Products,
  Profile,
  Signin,
  Signup,
  Verify,
  Wishlist,
  AdminRoot,
  AllProducts,
  OrderList,
  AddProduct,
  EditProduct,
  OrderRoot,
  SelectShippingMethod,
  SelectPaymentMethod,
  SelectAddress,
  EditVariant,
  EditAddress,
  PaymentVerify,
  OrderSuccess,
  AllOrders,
  UserList,
} from "./routes";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { PageLoader, ProtectedRoute } from "./components";
import { adminProductsLoader, rootLoader } from "./loaders";

const protectedRoute = (isAuthenticated, element) => (
  <ProtectedRoute isAuthenticated={isAuthenticated}>{element}</ProtectedRoute>
);

const routes = [
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    HydrateFallback: PageLoader,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "wishlist",
        element: protectedRoute(true, <Wishlist />),
      },
      {
        path: "cart",
        element: protectedRoute(true, <Cart />),
      },
      {
        path: "profile",
        element: protectedRoute(true, <Profile />),
      },
      {
        path: "address/:addressId/edit",
        element: protectedRoute(true, <EditAddress />),
      },
      { path: "products", element: <Products /> },
      { path: "products/product/:productId", element: <Product /> },
      {
        path: "order",
        element: protectedRoute(true, <OrderRoot />),
        children: [
          { path: "select-address", element: <SelectAddress /> },
          { path: "select-payment-method", element: <SelectPaymentMethod /> },
          { path: "select-shipping-method", element: <SelectShippingMethod /> },
        ],
      },
      {
        path: "order/verify",
        element: protectedRoute(true, <PaymentVerify />),
      },
      {
        path: "order/success",
        element: protectedRoute(true, <OrderSuccess />),
      },
      {
        path: "order/all",
        element: protectedRoute(true, <AllOrders />),
      },
      {
        path: "sign-up",
        children: [
          {
            index: true,
            element: protectedRoute(false, <Signup />),
          },
          { path: "verify", element: protectedRoute(false, <Verify />) },
        ],
      },
      {
        path: "sign-in",
        children: [
          {
            index: true,
            element: protectedRoute(false, <Signin />),
          },
          { path: "verify", element: protectedRoute(false, <Verify />) },
        ],
      },
      {
        path: "admin",
        element: protectedRoute(true, <AdminRoot />),
        children: [
          {
            path: "all-products",
            loader: adminProductsLoader,
            element: <AllProducts />,
          },
          { path: "add-product", element: <AddProduct /> },
          { path: "order-list", element: <OrderList /> },
          { path: "user-list", element: <UserList /> },
          { path: "product/:productId/edit", element: <EditProduct /> },
          {
            path: "product/variant/:variantId/edit",
            element: <EditVariant />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </Provider>
);
