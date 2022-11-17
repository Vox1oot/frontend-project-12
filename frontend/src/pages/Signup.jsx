import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import useAuthContext from '../hooks/index.js';

import { registartionSchema } from '../schemas/index.js';

import Nav from '../components/Nav';

const Signup = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const useAuth = useAuthContext();

  const {
    values, handleChange, handleSubmit, errors, handleBlur, touched,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registartionSchema,
    onSubmit: async ({ username, password }, actions) => {
      try {
        const { data } = await axios.post('/api/v1/signup', { username, password });

        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          useAuth.setUserData(data);

          navigate('/');
        }
      } catch (error) {
        rollbar.error('Sign up', error);
        if (error.response.status === 409) {
          actions.setFieldError('registration', 'exists');
        }
      }
    },
  });

  return (
    <>
      <Nav />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="./images/signup.jpg"
                    className="rounded-circle"
                    alt="Зарегистрироваться"
                  />
                </div>

                <Form className="col-12 col-md-6" onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">{t('registration')}</h1>
                  <Form.Group className="form-floating mb-3" controlId="username">
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip">{errors.username && t(`errors.${errors.username}`)}</Tooltip>}
                      show={!!touched.username && errors.username}
                      trigger="focus"
                    >
                      <Form.Control
                        className={!!touched.username && ((errors.username && 'is-invalid') || (errors.registration && 'is-invalid'))}
                        type="text"
                        placeholder={t('user.username')}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        autoFocus
                        required
                      />
                    </OverlayTrigger>
                    <Form.Label>{t('user.username')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3" controlId="password">
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip">{errors.password && t(`errors.${errors.password}`)}</Tooltip>}
                      show={!!touched.password && errors.password}
                      trigger="focus"
                    >
                      <Form.Control
                        className={!!touched.password && ((errors.password && 'is-invalid') || (errors.registration && 'is-invalid'))}
                        type="password"
                        placeholder={t('user.password')}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        required
                      />
                    </OverlayTrigger>
                    <Form.Label>{t('user.password')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3" controlId="confirmPassword">
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={(
                        <Tooltip className="custom-tooltip tooltip">
                          {(errors.confirmPassword && t(`errors.${errors.confirmPassword}`)) || (errors.registration && t(`errors.${errors.registration}`))}
                        </Tooltip>
                        )}
                      // eslint-disable-next-line max-len
                      show={!!touched.confirmPassword && (errors.confirmPassword || errors.registration)}
                      trigger="focus"
                    >
                      <Form.Control
                        className={!!touched.confirmPassword && ((errors.confirmPassword && 'is-invalid') || (errors.registration && 'is-invalid'))}
                        type="password"
                        placeholder={t('user.confirmPassword')}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        required
                      />
                    </OverlayTrigger>
                    <Form.Label>{t('user.confirmPassword')}</Form.Label>
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                  >
                    {t('buttons.registration')}
                  </Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('questions.haveAccount')}
                    {' '}
                  </span>
                  <Link to="/login">{t('logIn')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
