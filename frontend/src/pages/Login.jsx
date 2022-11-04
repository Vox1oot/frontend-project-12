import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useFormik } from 'formik';
import axios from 'axios';

import schema from '../schemas/index.js';
import useAuthContext from '../hooks/index.jsx';

const Login = () => {
  const navigate = useNavigate();
  const inputUserName = useRef(null);
  const useAuth = useAuthContext();

  const { values, handleChange, handleSubmit, errors, isValid, isSubmitting } = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: schema,
      onSubmit: async ({ username, password }, actions) => {
        try {
          const { data } = await axios.post('/api/v1/login', {
            username,
            password,
          });

          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            useAuth.setUserData(data);

            navigate('/');
          }
        } catch (error) {
          if (error.response.status === 401) {
            actions.setFieldError('authentication', 'Неверное имя пользователя и/или пароль!');
          }
        }
      },
    });

  useEffect(() => {
    inputUserName.current.focus();
  }, [errors.authentication]);

  return (
    <>
      <Nav />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="./images/enter.jpg"
                    className="rounded-circle"
                    alt="Войти"
                  />
                </div>

                <Form className="w-50" onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3" controlId="username" >
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip" >{errors.username || errors.authentication}</Tooltip>}
                      show={errors.username}
                      trigger='focus'
                    >
                      <Form.Control
                        className={errors.username && 'is-invalid'
                        || errors.authentication && 'is-invalid'}
                        type="text"
                        placeholder="Ваш ник"
                        value={values.username}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        autoFocus
                        ref={inputUserName}
                      />
                    </OverlayTrigger>
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3" controlId="password" >
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip" >{errors.password}</Tooltip>}
                      show={errors.password}
                      trigger='focus'
                    >
                      <Form.Control
                        className={errors.password && 'is-invalid'
                        || errors.authentication && 'is-invalid'}
                        type="password"
                        placeholder="Пароль"
                        value={values.password}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      />
                    </OverlayTrigger>
                    <Form.Label>Пароль</Form.Label>
                  </Form.Group>

                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Войти
                  </Button>
                </Form>

              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="#" onClick={() => navigate('/signup')}>Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
