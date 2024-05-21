import * as Yup from 'yup';

export interface FormPFProps{
    certificado: File | string | Blob;
    senha: string;
}

export const FormPFSchema: FormPFProps = {certificado: '', senha: ''};

export const FormPFSchemaValidation = Yup.object().shape({
    certificado: Yup.mixed<File>().required('Certificado é obrigatório')
                    .test('size', 'O arquivo é muito grande', (file) => {
                        return file.size < 4000000;
                    })
                    .test('type', 'Formatos aceitos: pfx', (file) => {
                        return file.type === 'application/x-pkcs12';
                    }),
    senha: Yup.string().required('Senha é obrigatória')
});