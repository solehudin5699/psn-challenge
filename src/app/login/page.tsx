'use client';

import { Field, Form } from '@/components/base/FormBase';
import { LOGO_PSN } from '@/configs/images';
import Image from 'next/image';
import React from 'react';
import validation from './validation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useLogin } from '@/hooks/useServices';

function Login() {
  const login = useLogin();
  const handleLogin = (values: { username: string; password: string }) => {
    login.mutate(values, {
      onSuccess: (_data) => {
        window.location.href = '/';
      },
      onError: (_error) => {},
    });
  };
  const renderLabel = (label: string, id: string) => {
    return (
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    );
  };
  return (
    <div className="grid place-content-center min-h-screen">
      <div className="h-10 w-20 relative mx-auto mt-3 mb-20">
        <Image src={LOGO_PSN} alt="Logo" fill />
      </div>
      <Form
        initialValues={{
          username: '',
          password: '',
        }}
        validation={validation}
        className="w-[300px] sm:w-[450px] shadow-lg border border-gray-100 p-5 rounded-2xl flex flex-col gap-y-3"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-2xl font-bold mb-5">Login</h1>
        <div>
          {renderLabel('Username', 'username')}
          <Field
            name="username"
            component={InputText}
            className="w-full"
            placeholder="Input usename"
            id="username"
          />
        </div>
        <div>
          {renderLabel('Password', 'password')}
          <Field
            name="password"
            component={Password}
            className="w-full items-center flex"
            placeholder="Input password"
            id="password"
            type="password"
            toggleMask
            inputClassName="w-[260px] sm:w-[410px]"
            fieldClassName="w-full"
          />
        </div>
        <Button
          className="w-min-[96px] !mt-10"
          label="Login"
          disabled={login.isPending}
          loading={login.isPending}
          loadingIcon="pi pi-spin pi-spinner"
        />
      </Form>
    </div>
  );
}

export default Login;
