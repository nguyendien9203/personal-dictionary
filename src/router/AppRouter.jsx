import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import WordDetailPage from "../pages/WordDetailPage";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/wordDetail" element={<WordDetailPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
  )
}

export default AppRouter