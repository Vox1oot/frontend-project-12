import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Nav from '../components/Nav';

import { useFormik } from 'formik';
import { registartionSchema } from '../schemas/index.js';

const Signup = () => {
  const { values, handleChange, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registartionSchema,
    onSubmit: ( values ) => {
      console.log(values);
    }
  })

  console.log(errors);

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
                <Form className='w-50' onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group className="form-floating mb-3" controlId="username">
                      <Form.Control 
                        className={errors.username && 'is-invalid'} 
                        type="text" 
                        placeholder="Имя пользователя" 
                        value={values.username}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        />
                      <Form.Label>Имя пользователя</Form.Label>
                      <Alert show={ !!errors.username } variant='danger'>{errors.username}</Alert>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="password">
                    <Form.Control className="form-floating mb-3" type="text" placeholder="Пароль" />
                      <Form.Label>Пароль</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="confirmPassword">
                    <Form.Control className="form-floating mb-3" type="text" placeholder="Подтвердите пароль" />
                      <Form.Label>Подтвердите пароль</Form.Label>
                    </Form.Group>
                    <Button className="w-100" variant="outline-primary" type="submit" disabled={!isValid}>
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
