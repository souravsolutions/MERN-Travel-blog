import multer from "multer";
import { storage } from "../utils/cloudnary-conig.js";

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export default upload;