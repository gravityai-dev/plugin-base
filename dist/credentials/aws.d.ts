/**
 * Shared AWS Credential Definition
 * Used by all AWS-based service packages (Nova, Bedrock, etc.)
 */
export declare const AWSCredential: {
    name: string;
    displayName: string;
    description: string;
    properties: ({
        name: string;
        displayName: string;
        type: "string";
        required: boolean;
        secret: boolean;
        description: string;
        placeholder: string;
        default?: undefined;
    } | {
        name: string;
        displayName: string;
        type: "string";
        default: string;
        required: boolean;
        description: string;
        placeholder: string;
        secret?: undefined;
    })[];
};
//# sourceMappingURL=aws.d.ts.map