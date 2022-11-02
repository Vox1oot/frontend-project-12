import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from '../components/Nav';

const Signup = () => {
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
                <Form className='w-50'>
                  <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group className="form-floating mb-3" controlId="formName">
                      <Form.Control className="form-floating mb-3" type="text" placeholder="Имя пользователя" />
                      <Form.Label>Имя пользователя</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="formPassword">
                    <Form.Control className="form-floating mb-3" type="text" placeholder="Пароль" />
                      <Form.Label>Пароль</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="formConfirm">
                    <Form.Control className="form-floating mb-3" type="text" placeholder="Подтвердите пароль" />
                      <Form.Label>Подтвердите пароль</Form.Label>
                    </Form.Group>
                    <Button className="w-100" variant="outline-primary" type="submit">
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
