import { REGEX } from '@/configs';
import validate from '@/utils/validation';

export default validate((yup) => ({
  name: yup.string().required('Name is required'),
  email: yup.string().matches(REGEX.EMAIL, 'Email is not valid').required('Email is required'),
  body: yup.string().required('Comment is required'),
}));
