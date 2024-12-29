import './App.css';
import { AuthProvider } from './Context/AuthContext';
import { Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login';
import RequireAuth from './Components/RequireAuth';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
