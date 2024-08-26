import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Pets from "./pages/pets/index.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetDetails from "./pages/pet-details/index.tsx";
import Login from "./pages/login/index.tsx";
import NewPet from "./pages/new-pet/index.tsx";
import { ChakraProvider } from "@chakra-ui/react";

import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pets/:cityName",
    element: <Pets />,
  },
  {
    path: "/pet/:petId",
    element: <PetDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/new-pet",
    element: <NewPet />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  </StrictMode>
);
