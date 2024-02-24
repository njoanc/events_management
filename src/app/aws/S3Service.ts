import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import {Service} from "typedi";
import {BadRequestError} from "../../common/errors/BadRequestError";
import {Config} from "../../config/Config";
import {File} from "../events/input/FileInput";
dotenv.config();

@Service()
export class S3Service {
    private client: S3Client;
    private bucketName = Config.aws.bucket;

    constructor() {
        this.client = new S3Client({...Config.aws});
    }

    async uploadFile(file: File): Promise<string> {
        try {
            const params = {
                Bucket: this.bucketName,
                Key: `${file?.filename}`,
                Body: file?.buffer,
                ACL: "public-read" as const,
            };

            await this.client.send(new PutObjectCommand(params));

            return `https://${this.bucketName}.s3.${Config.aws.region}.amazonaws.com/${params.Key}`;
        } catch (error) {
            throw new BadRequestError();
        }
    }
}
