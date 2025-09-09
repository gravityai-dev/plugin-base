"use strict";
/**
 * Shared AWS Credential Definition
 * Used by all AWS-based service packages (Nova, Bedrock, etc.)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSCredential = void 0;
exports.AWSCredential = {
    name: "awsCredential",
    displayName: "AWS Credentials",
    description: "AWS credentials for AWS services (Bedrock, Nova, etc.)",
    properties: [
        {
            name: "accessKeyId",
            displayName: "Access Key ID",
            type: "string",
            required: true,
            secret: true,
            description: "Your AWS Access Key ID",
            placeholder: "AKIAIOSFODNN7EXAMPLE"
        },
        {
            name: "secretAccessKey",
            displayName: "Secret Access Key",
            type: "string",
            required: true,
            secret: true,
            description: "Your AWS Secret Access Key",
            placeholder: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
        },
        {
            name: "region",
            displayName: "AWS Region",
            type: "string",
            default: "us-east-1",
            required: false,
            description: "AWS region for services",
            placeholder: "us-east-1"
        },
    ],
};
//# sourceMappingURL=aws.js.map