'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { CadastroForm, ValidationCadastroScheme, formCadastroScheme } from './CadastroSchema';
import { LoginForm, ValidationLoginScheme, formLoginScheme } from './LoginSchema';
import { Button, FieldError, InputText, RenderIf, Template } from '@/components';

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const loginFormik = useFormik<LoginForm>({
        initialValues: formLoginScheme,
        validationSchema: ValidationLoginScheme,
        onSubmit: async (values: LoginForm) => {
            setLoading(true);
            console.log(values);
            setLoading(false);
        },
    });

    const cadastroFormik = useFormik<CadastroForm>({
        initialValues: formCadastroScheme,
        validationSchema: ValidationCadastroScheme,
        onSubmit: async (values: CadastroForm) => {
            setLoading(true);
            console.log(values);
            setLoading(false);
        },
    });
    
    return (
        <div>
            <Template loading={loading}>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8'>
                    
                
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <h2 className='text-center text-1xl font-bold leading-9 tracking-tight text-gray-900'>
                            {
                                newUserState ? 'Cadastro' : 'Login'
                            }
                        </h2>
                    </div>

                    <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <RenderIf condition={!newUserState}>
                            <form onSubmit={loginFormik.handleSubmit} className='space-y-2'>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Email: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='email' 
                                                placeholder='Email'
                                                value={loginFormik.values.email}
                                                onChange={loginFormik.handleChange} />
                                    <FieldError error={loginFormik.errors.email} />
                                </div>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Senha: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='password' 
                                                placeholder='Senha'
                                                type='password'
                                                value={loginFormik.values.password}
                                                onChange={loginFormik.handleChange} />
                                    <FieldError error={loginFormik.errors.password} />
                                </div>
                                <Button type='submit' 
                                                style='bg-indigo-500 hover:bg-indigo-700' 
                                                label='Entrar'/>

                                <Button type='button' 
                                        onClick={event => setNewUserState(true)} 
                                        style='mb-10 ml-2 bg-green-600 hover:bg-green-500' 
                                        label='Cadastrar'/>
                            </form>
                        </RenderIf>
                        <RenderIf condition={newUserState}>
                            <form onSubmit={cadastroFormik.handleSubmit} className='space-y-2'>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Nome: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='name' 
                                                placeholder='Nome'
                                                value={cadastroFormik.values.name}
                                                onChange={cadastroFormik.handleChange} />
                                    <FieldError error={cadastroFormik.errors.name} />
                                </div>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Email: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='email' 
                                                placeholder='Email'
                                                value={cadastroFormik.values.email}
                                                onChange={cadastroFormik.handleChange} />
                                    <FieldError error={cadastroFormik.errors.email} />
                                </div>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Senha: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='password' 
                                                placeholder='Senha'
                                                type='password'
                                                value={cadastroFormik.values.password}
                                                onChange={cadastroFormik.handleChange} />
                                    <FieldError error={cadastroFormik.errors.password} />
                                </div>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Confirme a senha: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='passwordMatch' 
                                                placeholder='Confirme a senha'
                                                type='password'
                                                value={cadastroFormik.values.passwordMatch}
                                                onChange={cadastroFormik.handleChange} />
                                    <FieldError error={cadastroFormik.errors.passwordMatch} />
                                </div>
                                <Button type='submit' 
                                                style='bg-indigo-500 hover:bg-indigo-700' 
                                                label='Salvar' />

                                <Button type='button' 
                                        onClick={event => setNewUserState(false)} 
                                        style='ml-2 bg-red-600 hover:bg-red-500' 
                                        label='Cancelar'/>
                            </form>
                        </RenderIf>
                    </div>
                </div>
            </Template>
        </div>
    )
}