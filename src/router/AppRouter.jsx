import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import WordDetailPage from "../pages/WordDetailPage";
import LoginPage from "../pages/LoginPage";
import ManageWordsPage from "../pages/ManageWordsPage";
import AddWordPage from "../pages/AddWordPage";
import EditWordForm from "../components/EditWordForm";
import ProposalPage from "../pages/ProposalPage";
import AddProposalPage from "../pages/AddProposalPage";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/wordDetail" element={<WordDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/proposal" element={<PrivateRoute><ProposalPage /></PrivateRoute>} />
                <Route path="/proposal/add" element={<PrivateRoute><AddProposalPage /></PrivateRoute>} />
            </Route>
            <Route path="/admin" element={<MainLayout />} >
                <Route index element={<PrivateRoute><ProposalPage /></PrivateRoute>} />
                <Route path="/admin/words" element={<PrivateRoute><ManageWordsPage /></PrivateRoute>} />
                <Route path="/admin/words/add" element={<PrivateRoute><AddWordPage /></PrivateRoute>} />
                <Route path="/admin/words/edit/:id" element={<PrivateRoute><EditWordForm /></PrivateRoute>} />
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRouter