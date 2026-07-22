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
import UploadNote from "./pages/UploadNote";
import NotesLibrary from "./pages/NotesLibrary";
import Feedback from "./pages/Feedback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMentors from "./pages/AdminMentors";
import AdminSessions from "./pages/AdminSessions";
import AdminNotes from "./pages/AdminNotes";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";

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

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
       <Route
  path="/reset-password/:email"
  element={<ResetPassword />}
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
  path="/chat/:id"
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
  path="/upload-note"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["mentor"]}>
        <UploadNote />
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
    <Route
  path="/notes-library"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["student"]}>
        <NotesLibrary />
      </RoleRoute>
    </ProtectedRoute>
  }
/>
 
  <Route
  path="/feedback"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={["mentor"]}>
        <Feedback />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/users"
  element={<AdminUsers />}
/>

<Route
  path="/admin/mentors"
  element={<AdminMentors />}
/>

<Route
  path="/admin/sessions"
  element={<AdminSessions />}
/>

<Route
  path="/admin/notes"
  element={<AdminNotes />}
/>

<Route
  path="/admin/reports"
  element={<AdminReports />}
/>

<Route
  path="/admin/settings"
  element={<AdminSettings />}
/>
    
      </Routes>

    </BrowserRouter>
  );
}

export default App;