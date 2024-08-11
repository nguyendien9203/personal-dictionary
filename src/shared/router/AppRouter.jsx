import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import HomePage from "../../features/home/pages/HomePage";
import LoginPage from "../../features/auth/pages/LoginPage";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        </Routes>
    </Router>
  )
}

export default AppRouter