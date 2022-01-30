import fs from 'fs'
import uploadConfig from '@config/upload'
import aws,{S3} from 'aws-sdk'
import mime from 'mime'
import IStorageProvider from "../models/IStorageProvider";
import path from 'path';

export default class S3StorageProvider implements IStorageProvider{
    private client : S3; 
    constructor(){
        this.client = new aws.S3({
            region: 'us-east-1',
        })
    }
    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tempFolder, file);
        const ContentType = mime.getType(originalPath);

        if(!ContentType){
            throw new Error('file not found');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: 'buscabelo-cdn',
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType
        }).promise();

        return file;

    }
    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);
        
        try{
            await fs.promises.stat(filePath);
        } catch{return}
        await fs.promises.unlink(filePath);
    }
}
