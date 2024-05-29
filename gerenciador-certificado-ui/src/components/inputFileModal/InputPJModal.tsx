'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { RenderIf, useNotification, Button, FieldError } from '@/components/index';
import { useCertificadoPJService } from '@/resources/certificado-pj/certificado-pj.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

interface InputPJModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onAddCertificate: () => void; // Nova prop para o callback
    tipoCertificado: 'LR' | 'LP' | 'SIMPLES' | 'MEI' | '';
}

export interface FormPJProps{
    certificado: File | null;
    senha: string;
    tipoCertificado: 'LR' | 'LP' | 'SIMPLES' | 'MEI' | '';
}

const validationSchema = Yup.object().shape({
    certificado: Yup.mixed<File>()
        .required('Certificado é obrigatório')
        .test('size', 'O arquivo é muito grande', (file) => !file || file.size < 4000000)
        .test('type', 'Formatos aceitos: pfx', (file) => !file || file.type === 'application/x-pkcs12'),
    senha: Yup.string().required('Senha é obrigatória')
});

export const InputPJModal: React.FC<InputPJModalProps> = ({ open, setOpen,  onAddCertificate, tipoCertificado}: InputPJModalProps) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const service = useCertificadoPJService();
    const notification = useNotification();
    const [fileName, setFileName] = useState<string>('');

    const formik = useFormik<FormPJProps>({
        initialValues: { certificado: null, senha: '', tipoCertificado: '' },
        validationSchema,
        onSubmit: async (values: FormPJProps) => {
            const form = new FormData();
            form.append('certificado', values.certificado as Blob);
            form.append('senha', values.senha);
            form.append('tipoCertificado', tipoCertificado);

            try {
                await service.create(form); // Aguarda a criação do certificado
                formik.resetForm();
                notification.notify('Certificado adicionado com sucesso', 'success');
                setOpen(false);
                onAddCertificate(); // Chama o callback para atualizar a lista de certificados
            } catch (error) {
                const errorMessage = (error as Error).message;
                notification.notify(errorMessage, 'error' as const);
                return;
            }
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            formik.setFieldValue('certificado', file);
            setFileName(file.name);
        }
    };

    return (
        <div>
            <RenderIf condition={open}>
                <div>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex items-center justify-center">
                        <div className="bg-white p-5 rounded-lg w-1/3">
                        <section className='flex flex-col items-center justify-center my-5'>
                            <h5 className='mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900'>Novo Certificado</h5>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='mt-4 grid grid-cols-1'>
                                    <label className='block text-base font-medium leading-6 text-gray-800'>Certificado: *</label>
                                    <FieldError error={formik.errors.certificado} />
                                    <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                                        <div className='text-center'>
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.5 14.5H9C9 14.6894 9.107 14.8625 9.27639 14.9472C9.44579 15.0319 9.64849 15.0136 9.8 14.9L9.5 14.5ZM11.5 13L11.8 12.6C11.6222 12.4667 11.3778 12.4667 11.2 12.6L11.5 13ZM13.5 14.5L13.2 14.9C13.3515 15.0136 13.5542 15.0319 13.7236 14.9472C13.893 14.8625 14 14.6894 14 14.5H13.5ZM11.5 11C10.1193 11 9 9.88071 9 8.5H8C8 10.433 9.567 12 11.5 12V11ZM14 8.5C14 9.88071 12.8807 11 11.5 11V12C13.433 12 15 10.433 15 8.5H14ZM11.5 6C12.8807 6 14 7.11929 14 8.5H15C15 6.567 13.433 5 11.5 5V6ZM11.5 5C9.567 5 8 6.567 8 8.5H9C9 7.11929 10.1193 6 11.5 6V5ZM9 10.5V14.5H10V10.5H9ZM9.8 14.9L11.8 13.4L11.2 12.6L9.2 14.1L9.8 14.9ZM11.2 13.4L13.2 14.9L13.8 14.1L11.8 12.6L11.2 13.4ZM14 14.5V10.5H13V14.5H14ZM15 5V1.5H14V5H15ZM13.5 0H1.5V1H13.5V0ZM0 1.5V13.5H1V1.5H0ZM1.5 15H8V14H1.5V15ZM0 13.5C0 14.3284 0.671573 15 1.5 15V14C1.22386 14 1 13.7761 1 13.5H0ZM1.5 0C0.671574 0 0 0.671573 0 1.5H1C1 1.22386 1.22386 1 1.5 1V0ZM15 1.5C15 0.671573 14.3284 0 13.5 0V1C13.7761 1 14 1.22386 14 1.5H15ZM3 5H8V4H3V5ZM3 8H6V7H3V8Z" fill="#000000"/>
                                            </svg>

                                            <div className='mt-3 flex text-sm leading-6 text-gray-600'>
                                                <label className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>
                                                    <span>{fileName || 'Clique para carregar'}</span>
                                                    <input type="file" className='sr-only' onChange={handleFileChange} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-base font-medium leading-6 text-gray-800 mt-4'>Senha: *</label>
                                    <FieldError error={formik.errors.senha} />
                                    <div className='mt-2 relative'>
                                        <input 
                                            className='border px-3 py-2 rounded-lg text-gray-900 w-full' 
                                            type={showPassword ? "text" : "password"} 
                                            {...formik.getFieldProps('senha')} 
                                        />
                                        <span 
                                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                </div>

                                <div className='mt-5 mb-5 flex items-center justify-center gap-x-6'>
                                    <Button style='bg-blue-500 hover:bg-blue-600' label='Salvar' type='submit'/>
                                    <Button onClick={() => setOpen(false)} style='bg-red-500 hover:bg-red-600' label='Cancelar' type='button' />
                                </div>
                            </form>
                        </section>
                        </div>
                    </div>
                </div>
            </RenderIf>
        </div>
    );
};   