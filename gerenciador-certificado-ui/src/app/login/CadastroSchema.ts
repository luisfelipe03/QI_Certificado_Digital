import * as Yup from 'yup';

export interface CadastroForm {
    nome?: string;
    email: string;
    senha: string;
    senhaMatch?: string;
}

export const formCadastroScheme: CadastroForm = {
    nome: '',
    email: '',
    senha: '',
    senhaMatch: ''
};

export const ValidationCadastroScheme = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().trim().email('Email inválido').required('O email é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
    senhaMatch: Yup.string().oneOf([Yup.ref('senha')], 'As senhas não coincidem')
});