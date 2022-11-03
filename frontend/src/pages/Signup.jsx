import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/index.jsx';

import { useFormik } from 'formik';
import { registartionSchema } from '../schemas/index.js';

import Nav from '../components/Nav';

const Signup = () => {
  const navigate = useNavigate();
  const useAuth = useAuthContext();

  const { values, handleChange, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registartionSchema,
    onSubmit: async ({ username, password }, actions ) => {
      try {
        const { data } = await axios.post('/api/v1/signup', { username, password });

        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          useAuth.setUserData(data);

          navigate('/');
        }
      } catch (error) {
        if (error.response.status === 409) {
          actions.setFieldError('registration', 'Такой пользователь уже существует');
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

                <Form className="w-50" onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <Form.Group className="form-floating mb-3" controlId="username" >
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip" >{errors.username}</Tooltip>}
                      show={errors.username}
                      trigger='focus'
                    >
                      <Form.Control
                        className={errors.username && 'is-invalid'
                        || errors.registration && 'is-invalid'}
                        type="text"
                        placeholder="Имя пользователя"
                        value={values.username}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        autoFocus
                      />
                    </OverlayTrigger>
                    <Form.Label>Имя пользователя</Form.Label>
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
                        || errors.registration && 'is-invalid'}
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

                  <Form.Group className="form-floating mb-3" controlId="confirmPassword" >
                    <OverlayTrigger
                      placement="bottom-start"
                      overlay={<Tooltip className="custom-tooltip tooltip" >{errors.confirmPassword || errors.registration}</Tooltip>}
                      show={errors.confirmPassword || errors.registration}
                      trigger='focus'
                    >
                      <Form.Control
                        className={errors.confirmPassword && 'is-invalid' 
                        || errors.registration && 'is-invalid'}
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      />
                     </OverlayTrigger>
                    <Form.Label>Подтвердите пароль</Form.Label>
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                    disabled={!isValid}
                  >
                    Зарегистрироваться
                  </Button>
                </Form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
