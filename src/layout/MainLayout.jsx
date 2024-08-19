import Header from "../components/Header";
import Footer from "../components/Footer";
import {Container} from "react-bootstrap";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container style={{padding: '0 150px'}}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </Container>
  );
};

export default MainLayout;
