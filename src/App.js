import React from "react";
import "react-multi-carousel/lib/styles.css";
import Header from "./Header";
import Image from "./Image";
import Breed from "./Breed";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BREEDS_ROUT, IMAGES_ROUT } from "./constants";
import CrtBreed from "./CrtBreed";

export default function App() {
  const Layout = () => (
    <div>
      <Header />
      <Outlet />
    </div>
  );

  const Breeds = () => (
    <div>
      <Breed />
      <Outlet />
    </div>
  )

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // Use Layout as the root element
      children: [
        {
          path: IMAGES_ROUT,
          element: <Image />,
        },
        {
          path: BREEDS_ROUT,
          element: <Breeds />,
          children: [
            {
              path: ':crtBreed',
              element: <CrtBreed />
            },
            {
              path: ':crtBreed/:subCrtBreed',
              element: <CrtBreed />
            }
          ]
        },
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}