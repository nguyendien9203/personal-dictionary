import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import PropTypes from "prop-types";
import CustomContainer from "../components/CustomContainer";

const MainLayout = ({ children }) => {
  return (
    <CustomContainer>
      <div className="main-layout">
        <Header />
        <Search />
        <main>{children}</main>
        <Footer />
      </div>
    </CustomContainer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
