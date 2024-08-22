import { useState, useContext } from 'react';
import { Form, Button, Row, Col, Card, Image, Container } from 'react-bootstrap';
import FloatingInputSelect from './FloatingInputSelect';
import IllustationLogin from '../assets/images/illustration-login.png';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../utils/notification';

const Login = () => {

  const { login, isAdmin, isMember } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // Reset lỗi khi người dùng nhập
    if (value.trim()) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      username: !loginData.username.trim() ? 'Username is required.' : '',
      password: !loginData.password.trim() ? 'Password is required.' : ''
      // password: loginData.password.length < 8 ? 'Password must be at least 8 characters long.' : '',
    };
    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      const response = await login(loginData);
      if (response) {
        if (isAdmin()) {
          navigate('/admin');
        } else if (isMember()) {
          navigate('/');
        }
      } else {
        notifyError('Invalid username or password');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-none d-md-flex align-items-center">
          <Image src={IllustationLogin} fluid />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form noValidate onSubmit={handleLogin}>
                <FloatingInputSelect
                  label="Username"
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  isInvalid={!!errors.username}
                  errorMessage={errors.username}
                />
                <FloatingInputSelect
                  label="Password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password}
                />
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
