import fs from 'fs'
import uploadConfig from '@config/upload'
import aws,{S3} from 'aws-sdk'
import IStorageProvider from "../models/IStorageProvider";
import path from 'path';

export default class S3StorageProvider implements IStorageProvider{
    private client : S3; 
    constructor(){
        this.client = new aws.S3({
            region: 'us-east1',
        })
    }
    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tempFolder, file);

        const fileContent = await fs.promises.readFile(originalPath, {
            encoding: 'utf-8',
        });

        await this.client.putObject({
            Bucket: 'buscabelo-cdn',
            Key: file,
            ACL: 'public-read',
            Body: fileContent
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
