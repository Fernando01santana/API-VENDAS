import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
//__dirname = referencia do diretorio atual onde se encontra o arquivo
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        //destino do arquivo
        destination: uploadFolder,
        //determina a forma que cada arquivo vai ser nomeado quando chegar no servidor
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            callback(null, fileName);
        },
    }),
};
