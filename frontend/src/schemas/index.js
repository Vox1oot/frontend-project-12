import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Пожалуйста, заполните это поле'),
  password: yup.string().required('Пожалуйста, заполните это поле'),
});

export default schema;
