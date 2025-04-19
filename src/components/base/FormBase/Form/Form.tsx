import { FormProvider, useForm, Resolver, UseFormReturn, UseFormProps } from 'react-hook-form';
import React, { useEffect } from 'react';

type TChildren = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>['children'];
interface Props<TValues extends { [key: string]: any }> {
    children: TChildren | ((form: UseFormReturn<TValues>) => TChildren);
    className?: string;
    enableReinitialize?: boolean;
    form?: UseFormReturn<TValues>;
    initialValues: TValues;
    onSubmit: (values: TValues, e?: React.BaseSyntheticEvent<object, any, any>) => void;
    options?: Omit<UseFormProps, 'defaultValues' | 'resolver'>;
    style?: React.CSSProperties;
    validation?: Resolver<any>;
}

function Form<TValues extends { [key: string]: any }>(props: Props<TValues>) {
    const {
        children,
        form: customForm,
        onSubmit,
        initialValues,
        validation,
        options,
        className,
        style,
        enableReinitialize,
    } = props;

    const defaultForm = useForm({
        defaultValues: initialValues,
        resolver: validation,
        mode: 'all',
        ...options,
    });
    const form = customForm || defaultForm;
    form.watch();

    const child = typeof children === 'function' ? children(form) : children;

    useEffect(() => {
        if (enableReinitialize) {
            form.reset(initialValues);
        }
    }, [initialValues, enableReinitialize]);

    return (
        <FormProvider {...form}>
            <form style={style} className={className} onSubmit={form.handleSubmit(onSubmit)}>
                {child}
            </form>
        </FormProvider>
    );
}
Form.defaultProps = {
    className: '',
    enableReinitialize: true,
    form: undefined,
    options: undefined,
    style: undefined,
    validation: undefined,
};
export default Form;
