import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {mockClient} from "aws-sdk-client-mock";
import {File} from "../../src/app/events/input/FileInput";

export class AWSFileUploaderMock {
    private client: any;

    private bucketName = "test-bucket";

    constructor() {
        this.client = mockClient(S3Client);
    }

    async uploadFile(file: File): Promise<string> {
        const params = {
            Bucket: this.bucketName,
            Key: `${file?.filename}`,
            Body: file?.buffer,
            ACL: "public-read" as const,
        };

        await this.client.send(new PutObjectCommand(params));

        return `https://${this.bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
    }
}

export default new AWSFileUploaderMock();
