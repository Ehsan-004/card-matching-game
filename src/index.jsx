import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './Pages/MainLayout'
import Home from './Pages/Home'
import Leaderboard from './Pages/Leaderboard'
import Game from './Pages/Game'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />
      },
      {
        path: '/game',
        element: <Game />
      },
    ]
  }
])


export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
