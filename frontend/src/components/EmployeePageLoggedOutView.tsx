import { Container } from 'react-bootstrap';
import styleUtils from '../style/utils.module.css';
import Footer from './Footer';

const EmployeePageLoggedInView = () => {
  return (
    <Container fluid>
      <p className={styleUtils.p1}>Simple Employee Database</p>
      <p className={styleUtils.p2}>Looking for an easy and efficient way to manage your employees' information? Say goodbye to the hassle of organizing scattered data and welcome our <span className={styleUtils.highlight}>Employee Database template</span>. Perfect for HR professionals or small business owners, our template offers a centralized location to store all your employees' data, from emails to hire dates. With just a few clicks, you can access and manage all the information you need in one place. <span className={styleUtils.cta}>Try our Employee Database template today and streamline your employee management process!</span></p>
      <Footer />
    </Container>
  );
}

export default EmployeePageLoggedInView;
