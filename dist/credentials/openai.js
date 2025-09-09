"use strict";
/**
 * Shared OpenAI Credential Definition
 * Used by OpenAI service package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAICredential = void 0;
exports.OpenAICredential = {
    name: "openAICredential",
    displayName: "OpenAI",
    description: "Credentials for OpenAI API",
    properties: [
        {
            name: "apiKey",
            displayName: "API Key",
            type: "string",
            required: true,
            secret: true,
            description: "Your OpenAI API key",
            placeholder: "sk-..."
        },
        {
            name: "organizationId",
            displayName: "Organization ID",
            type: "string",
            required: false,
            description: "Your OpenAI organization ID (optional)",
            placeholder: "org-..."
        },
        {
            name: "baseUrl",
            displayName: "Base URL",
            type: "string",
            default: "https://api.openai.com/v1",
            required: false,
            description: "Custom API endpoint (optional)"
        }
    ]
};
//# sourceMappingURL=openai.js.map