'use client';

import React, { useState } from 'react';
import { Button, InputText, Template } from '@/components/index';
import { useFormik } from 'formik';
import { useCertificadoPFService } from '@/resources/certificado-pf/certificado-pf.service';

interface FormProps {
    certificado: any;
    senha: string;
}

const formSchema: FormProps = { certificado: '', senha: '' };

export default function Page() {
    const service = useCertificadoPFService();
    const [fileName, setFileName] = useState<string>('');

    const formik = useFormik<FormProps>({
        initialValues: formSchema,
        onSubmit: (values: FormProps) => {
            const form = new FormData();
            form.append('certificado', values.certificado);
            form.append('senha', values.senha);
            console.log(form);
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            formik.setFieldValue('certificado', file);
            setFileName(file.name);
        }
    };

    return (
        <Template loading={false}>
            <section className='flex flex-col items-center justify-center my-5'>
                <h1 className='mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900'>Teste de Formulário</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-1'>
                        <label className='block text-sm font-medium leading-6 text-gray-600'>
                            Certificado: *
                        </label>
                        <label className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>
                            <span>{fileName || 'Clique para carregar'}</span>
                            <input
                                id='certificado'
                                type='file'
                                className='sr-only'
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <div className='mt-5 grid grid-cols-1'>
                        <label className='block text-sm font-medium leading-6 text-gray-600'>
                            Senha: *
                        </label>
                        <InputText
                            id='senha'
                            onChange={formik.handleChange}
                            type='password'
                            value={formik.values.senha}
                        />
                    </div>

                    <div>
                        <Button style='mt-5 bg-green-600' type='submit' label='Ver Dados' />
                    </div>
                </form>
            </section>
        </Template>
    );
}
