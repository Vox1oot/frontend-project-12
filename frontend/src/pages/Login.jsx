import { useFormik } from 'formik';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import schema from '../schemas/index.js';
import useAuthContext from '../hooks/index.jsx';

import Nav from '../components/Nav';

const Login = () => {
  const navigate = useNavigate();
  const inputUserName = useRef(null);
  const useAuth = useAuthContext();

  const { values, handleChange, handleSubmit, errors, isSubmitting } = useFormik({
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
            actions.setFieldError(
              'authentication',
              'Неверное имя пользователя и/или пароль!'
            );
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
                <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0" >
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <input
                      ref={inputUserName}
                      type="text"
                      name="username"
                      required
                      placeholder="Ваш ник"
                      id="username"
                      className={
                        errors.authentication
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      value={values.username}
                      onChange={handleChange}
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      id="password"
                      className={
                        errors.authentication
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      value={values.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="pasword">Пароль</label>
                    {errors.authentication && (
                      <div className="invalid-tooltip">
                        {errors.authentication}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                    disabled={isSubmitting}
                  >
                    Войти
                  </button>
                </form>
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
