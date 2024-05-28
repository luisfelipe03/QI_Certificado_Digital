import * as Yup from 'yup';

export interface LoginForm {
    email: string;
    senha: string;
}

export const formLoginScheme: LoginForm = {
    email: '',
    senha: '',
};

export const ValidationLoginScheme = Yup.object().shape({
    email: Yup.string().trim().email('Email inválido').required('O email é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
});