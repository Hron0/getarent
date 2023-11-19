import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }/* ,
  {
    path: "/blog",
    element: <Deck />
  },
  {
    path: "/park"
    element: < />
  },
  {
    path: "/profile/:id"
    element: < />
  },
  {
    path: "/parking/"
    element: < />
  } */
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
