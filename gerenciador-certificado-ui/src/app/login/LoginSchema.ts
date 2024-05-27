import * as Yup from 'yup';

export interface LoginForm {
    email: string;
    password: string;
}

export const formLoginScheme: LoginForm = {
    email: '',
    password: '',
};

export const ValidationLoginScheme = Yup.object().shape({
    email: Yup.string().trim().email('Email inválido').required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
});