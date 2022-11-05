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

import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
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
            actions.setFieldError('authentication', 'auth');
          }
        }
      },
    });

  console.log(errors);

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
                  <h1 className="text-center mb-4">{t('signIn')}</h1>
                  <Form.Group className="form-floating mb-3" controlId="username" >
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={
                      <Tooltip className="custom-tooltip tooltip" >
                        {errors.username && t(`errors.${errors.username}`) 
                        || errors.authentication && t(`errors.${errors.authentication}`)}
                      </Tooltip>
                        }
                      show={errors.username}
                      trigger='focus'
                    >
                      <Form.Control
                        className={errors.username && 'is-invalid'
                        || errors.authentication && 'is-invalid'}
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        placeholder={t('user.nickname')}
                        required
                        autoComplete="off"
                        autoFocus
                        ref={inputUserName}
                      />
                    </OverlayTrigger>
                    <Form.Label>{t('user.nickname')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3" controlId="password" >
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip" >{errors.password && t(`errors.${errors.password}`)}</Tooltip>}
                      show={errors.password}
                      trigger='focus'
                    >
                      <Form.Control
                        className={errors.password && 'is-invalid'
                        || errors.authentication && 'is-invalid'}
                        type="password"
                        placeholder={t('user.password')}
                        value={values.password}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      />
                    </OverlayTrigger>
                    <Form.Label>{t('user.password')}</Form.Label>
                  </Form.Group>

                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    {t('buttons.logon')}
                  </Button>
                </Form>

              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('questions.haveAccount')} </span>
                  <a href="#" onClick={() => navigate('/signup')}>{t('registration')}</a>
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
