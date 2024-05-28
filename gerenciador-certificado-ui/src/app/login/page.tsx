'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { CadastroForm, ValidationCadastroScheme, formCadastroScheme } from './CadastroSchema';
import { LoginForm, ValidationLoginScheme, formLoginScheme } from './LoginSchema';
import { Button, FieldError, InputText, RenderIf, Template } from '@/components';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                        <img src="" alt="Logo" className="mx-auto h-12 w-auto" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {newUserState ? 'Cadastro' : 'Login'}
                        </h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                            <RenderIf condition={!newUserState}>
                                <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="text-gray-400" />
                                            </div>
                                            <InputText
                                                style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                id="email"
                                                placeholder="Email"
                                                value={loginFormik.values.email}
                                                onChange={loginFormik.handleChange}
                                            />
                                        </div>
                                        <FieldError error={loginFormik.errors.email} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="text-gray-400" />
                                            </div>
                                            <InputText
                                                style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                id="password"
                                                placeholder="Senha"
                                                type="password"
                                                value={loginFormik.values.password}
                                                onChange={loginFormik.handleChange}
                                            />
                                        </div>
                                        <FieldError error={loginFormik.errors.password} />
                                    </div>

                                    <Button type="submit" style="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md" label="Entrar" />
                                    <Button type="button" onClick={() => setNewUserState(true)} style="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md mt-4" label="Cadastrar" />
                                </form>
                            </RenderIf>

                            <RenderIf condition={newUserState}>
                                <form onSubmit={cadastroFormik.handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="text-gray-400" />
                                            </div>
                                            <InputText
                                                style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                id="name"
                                                placeholder="Nome"
                                                value={cadastroFormik.values.name}
                                                onChange={cadastroFormik.handleChange}
                                            />
                                        </div>
                                        <FieldError error={cadastroFormik.errors.name} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="text-gray-400" />
                                            </div>
                                            <InputText
                                                style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                id="email"
                                                placeholder="Email"
                                                value={cadastroFormik.values.email}
                                                onChange={cadastroFormik.handleChange}
                                            />
                                        </div>
                                        <FieldError error={cadastroFormik.errors.email} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="text-gray-400" />
                                            </div>
                                            <InputText
                                                style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                id="password"
                                                placeholder="Senha"
                                                type="password"
                                                value={cadastroFormik.values.password}
                                                onChange={cadastroFormik.handleChange}
                                            />
                                        </div>
                                        <FieldError error={cadastroFormik.errors.password} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Confirme a senha</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="text-gray-400" />
                                            </div>
                                            <InputText
                                                style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                id="passwordMatch"
                                                placeholder="Confirme a senha"
                                                type="password"
                                                value={cadastroFormik.values.passwordMatch}
                                                onChange={cadastroFormik.handleChange}
                                            />
                                        </div>
                                        <FieldError error={cadastroFormik.errors.passwordMatch} />
                                    </div>

                                    <Button type="submit" style="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md" label="Salvar" />
                                    <Button type="button" onClick={() => setNewUserState(false)} style="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md mt-4" label="Cancelar" />
                                </form>
                            </RenderIf>
                        </div>
                    </div>
                </div>
        </div>
    );
}
