import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Пожалуйста, заполните это поле'),
  password: yup.string().required('Пожалуйста, заполните это поле'),
});

export const channelSchema = yup.object().shape({
  channelName: yup.string().matches(/^[a-zа-я\d]+$/gi, 'Только буквы и цифры').min(3, 'От 3 до 20 символов').max(20,'От 3 до 20 символов').required('Обязательное поле'),
});

export default schema;
