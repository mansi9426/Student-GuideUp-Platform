import "./index.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Mentors from "./pages/Mentors";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Sessions from "./pages/Sessions";
import AdminRoute from "./components/AdminRoute";
import RoleRoute from "./components/RoleRoute";
import CreateSlot from "./pages/CreateSlot";
import AvailableSessions from "./pages/AvailableSessions";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
  path="/mentors"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["student"]}>
        <Mentors />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

        <Route
  path="/requests"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["mentor"]}>
        <Requests />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>
    <Route
  path="/create-slot"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["mentor"]}>
        <CreateSlot />
      </RoleRoute>
    </ProtectedRoute>
  }
/> 
    <Route
  path="/available-sessions"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["student"]}>
        <AvailableSessions />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

    <Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["student"]}>
        <MyBookings />
      </RoleRoute>
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;