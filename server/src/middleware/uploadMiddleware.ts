import multer, { Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore
const storage: Multer['storage'] = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const fileName = `${uuidv4()}-${file.originalname}`; // Generate a unique filename
        cb(null, fileName);
    },
});

export const upload: Multer = multer({ storage });
