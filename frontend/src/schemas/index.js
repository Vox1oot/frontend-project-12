import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
});

export const registartionSchema = yup.object().shape({
  username: yup.string()
    .matches(/^[a-z\d]+$/gi, 'latin')
    .min(3, 'min3')
    .max(20, 'max')
    .required('required'),
  password: yup.string()
    .matches(/^[a-z\d@$!%*#?&]+$/gi, 'validPassword')
    .min(6, 'min6')
    .max(20, 'max')
    .required('required'),
  confirmPassword: yup.string().required('required').oneOf([yup.ref('password'), null], 'match'),
});

export const channelSchema = yup.object().shape({
  channelName: yup.string()
    .min(3, 'min3')
    .max(20, 'max')
    .required('required'),
});

export default schema;
