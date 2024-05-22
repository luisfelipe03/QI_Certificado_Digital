import * as Yup from 'yup';

export interface FormPJProps{
    certificado: File | string | Blob;
    senha: string;
    tipoCertificado: 'LR' | 'LP' | 'SIMPLES' | 'MEI' | '';
}

export const FormPJSchema: FormPJProps = {certificado: '', senha: '', tipoCertificado: ''};

export const FormPJSchemaValidation = Yup.object().shape({
    certificado: Yup.mixed<File>().required('Certificado é obrigatório')
                    .test('size', 'O arquivo é muito grande', (file) => {
                        return file.size < 4000000;
                    })
                    .test('type', 'Formatos aceitos: pfx', (file) => {
                        return file.type === 'application/x-pkcs12';
                    }),
    senha: Yup.string().required('Senha é obrigatória')
});