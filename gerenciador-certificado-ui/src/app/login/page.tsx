'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { CadastroForm, ValidationCadastroScheme, formCadastroScheme } from './CadastroSchema';
import { LoginForm, ValidationLoginScheme, formLoginScheme } from './LoginSchema';
import { Button, FieldError, InputText, RenderIf, Template, useNotification } from '@/components';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '@/resources/index';
import { useRouter } from 'next/navigation';
import { AccessToken, Credentials } from '@/resources/user/users.resource';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
    const [newUserState, setNewUserState] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const auth = useAuth();
    const router = useRouter();
    const notification = useNotification();

    const loginFormik = useFormik<LoginForm>({
        initialValues: formLoginScheme,
        validationSchema: ValidationLoginScheme,
        onSubmit: async (values: LoginForm) => {
            const credentials: Credentials = {email: values.email, senha: values.senha}
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                loginFormik.resetForm();
                router.push('/');
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, 'error');
            }   
        },
    });

    const cadastroFormik = useFormik<CadastroForm>({
        initialValues: formCadastroScheme,
        validationSchema: ValidationCadastroScheme,
        onSubmit: async (values: CadastroForm) => {
            try {
                await auth.save({nome: values.nome, email: values.email, senha: values.senha});
                setNewUserState(false);
                loginFormik.resetForm();
                cadastroFormik.resetForm();
                notification.notify('Usuário cadastrado com sucesso', 'success');
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, 'error');
            }
        },
    });
    
    return (  
            <div className="min-h-screen flex items-center justify-center bg-blue-qi">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                            <img src="/images/logo3.png" alt="Logo" className="mx-auto" />
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
                                                    id="senha"
                                                    placeholder="Senha"
                                                    type={showPassword ? "text" : "password"}
                                                    value={loginFormik.values.senha}
                                                    onChange={loginFormik.handleChange}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </span>
                                            </div>
                                            <FieldError error={loginFormik.errors.senha} />
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
                                                    id="nome"
                                                    placeholder="Nome"
                                                    value={cadastroFormik.values.nome}
                                                    onChange={cadastroFormik.handleChange}
                                                />
                                            </div>
                                            <FieldError error={cadastroFormik.errors.nome} />
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
                                                    id="senha"
                                                    placeholder="Senha"
                                                    type={showPassword ? "text" : "password"}
                                                    value={cadastroFormik.values.senha}
                                                    onChange={cadastroFormik.handleChange}
                                                />
                                                <span
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </span>
                                            </div>
                                            <FieldError error={cadastroFormik.errors.senha} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Confirme a senha</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaLock className="text-gray-400" />
                                                </div>
                                                <InputText
                                                    style="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    id="senhaMatch"
                                                    placeholder="Confirme a senha"
                                                    type={showPassword ? "text" : "password"}
                                                    value={cadastroFormik.values.senhaMatch}
                                                    onChange={cadastroFormik.handleChange}
                                                />
                                            </div>
                                            <FieldError error={cadastroFormik.errors.senhaMatch} />
                                        </div>

                                        <Button type="submit" style="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md" label="Salvar" />
                                        <Button type="button" onClick={() => setNewUserState(false)} style="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md mt-4" label="Cancelar" />
                                    </form>
                                </RenderIf>
                            </div>
                        </div>
                    </div>
                    <ToastContainer position='top-right'
                            autoClose={8000}
                            hideProgressBar={false}
                            draggable={false}
                            closeOnClick={true}
                            pauseOnHover={true}
            />    
            </div>
    );
}
