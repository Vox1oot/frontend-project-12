import * as yup from 'yup';

let schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default schema;
