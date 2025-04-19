import { REGEX } from '@/configs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as YupModule from 'yup';
import type * as YupType from 'yup';

const Yup = {
  ...YupModule,
  common: () => ({
    required: (options?: { requiredMessage?: string }) =>
      YupModule.string().required(options?.requiredMessage || 'Harus diisi'),
    password: (options?: { passwordMessage?: string; requiredMessage?: string }) =>
      YupModule.string()
        .required(options?.requiredMessage || 'Harus diisi')
        .matches(
          REGEX.PASSWORD,
          options?.passwordMessage ||
            'Kata sandi harus terdiri dari huruf besar, huruf kecil, angka dan panjang 8 s/d 15 karakter'
        ),
    phone: (options?: { phoneMessage?: string }) =>
      YupModule.string().matches(REGEX.PHONE, options?.phoneMessage || 'Nomor telepon tidak valid'),
  }),
};

type Callback<T extends { [key: string]: YupType.Schema<any> }> = (yup: typeof Yup) => T;

const validate = <T extends { [key: string]: YupType.Schema<any> }>(callback: Callback<T>) => {
  const schema = Yup.object(callback(Yup));
  return yupResolver(schema);
};
export default validate;
