import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Пожалуйста, заполните это поле'),
  password: yup.string().required('Пожалуйста, заполните это поле'),
});

export const registartionSchema = yup.object().shape({
  username: yup.string()
    .matches(/^[a-z\d]+$/gi, 'Только латинские буквы и цифры')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .matches(/^[a-z\d]+$/gi, 'Только латинские буквы и цифры')
    .min(6, 'Минимум 6 символов')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string().required('Обязательное поле').oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})

export const channelSchema = yup.object().shape({
  channelName: yup.string()
    .matches(/^[a-zа-я\d]+$/gi, 'Только буквы и цифры')
    .min(3, 'От 3 до 20 символов')
    .max(20,'От 3 до 20 символов')
    .required('Обязательное поле'),
});

export default schema;
