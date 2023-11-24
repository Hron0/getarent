import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LogIn from './components/(_auth)/LogIn/LogIn.tsx'
import Register from './components/(_auth)/Register/Register.tsx'
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import Profile from './components/profile/Profile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile',
    element: (
      <RequireAuth loginPath={"/login"}>
        <Profile />
      </RequireAuth>
    )
  }
  /*{
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
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode >,
)
