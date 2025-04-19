import { REGEX } from '@/configs';
import validate from '@/utils/validation';

export default validate((yup) => ({
  username: yup.string().required('Field is required'),
  password: yup
    .string()
    .matches(
      REGEX.PASSWORD,
      'Password must be at least 8 characters, contain uppercase, lowercase, number, and special character.'
    )
    .required('Field is required'),
}));
