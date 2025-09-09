/**
 * Shared OpenAI Credential Definition
 * Used by OpenAI service package
 */
export declare const OpenAICredential: {
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
        required: boolean;
        description: string;
        placeholder: string;
        secret?: undefined;
        default?: undefined;
    } | {
        name: string;
        displayName: string;
        type: "string";
        default: string;
        required: boolean;
        description: string;
        secret?: undefined;
        placeholder?: undefined;
    })[];
};
//# sourceMappingURL=openai.d.ts.map