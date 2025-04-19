import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Field, Form } from '@/components/base/FormBase';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import validation from './validation';

interface IValues {
  name: string;
  email: string;
  body: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IValues) => void;
  isLoading?: boolean;
}

export default function ModalAddComment(props: Props) {
  const { isOpen, onClose, onSubmit, isLoading } = props;
  const renderLabel = (label: string, id: string) => {
    return (
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    );
  };
  return (
    <Dialog
      header="Add Comment"
      visible={isOpen}
      style={{ width: '50vw' }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      onHide={onClose}
    >
      <Form
        onSubmit={onSubmit}
        initialValues={{
          name: '',
          email: '',
          body: '',
        }}
        className="flex flex-col gap-y-3"
        validation={validation}
      >
        <div className="">
          {renderLabel('Name', 'name')}
          <Field
            name="name"
            component={InputText}
            className="w-full"
            placeholder="Input name"
            id="name"
          />
        </div>
        <div className="">
          {renderLabel('Email', 'email')}
          <Field
            name="email"
            component={InputText}
            className="w-full"
            placeholder="Input email"
            id="email"
          />
        </div>
        <div className="">
          {renderLabel('Body', 'body')}
          <Field
            name="body"
            component={InputTextarea}
            className="w-full"
            placeholder="Input body"
            id="body"
            rows={5}
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button outlined className="w-24" type="button" label="Cancel" onClick={onClose} />
          <Button
            className="w-min-[96px]"
            label="Save"
            disabled={isLoading}
            loading={isLoading}
            loadingIcon="pi pi-spin pi-spinner"
          />
        </div>
      </Form>
    </Dialog>
  );
}
