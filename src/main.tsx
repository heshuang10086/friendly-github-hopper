
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Index from './pages/Index'
import Chat from './pages/Chat'
import AuthPage from './pages/auth/AuthPage'
import SeekerDashboard from './pages/dashboard/SeekerDashboard'
import RecruiterDashboard from './pages/dashboard/RecruiterDashboard'
import SettingsPage from './pages/settings/SettingsPage'
import MyResumePage from './pages/resume/MyResumePage'
import ResumeViewPage from './pages/resume/ResumeViewPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "seeker-dashboard",
        element: <SeekerDashboard />,
      },
      {
        path: "recruiter-dashboard",
        element: <RecruiterDashboard />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "my-resume",
        element: <MyResumePage />,
      },
      {
        path: "resume-view",
        element: <ResumeViewPage />,
      },
      {
        path: "resume-view/:id",
        element: <ResumeViewPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
