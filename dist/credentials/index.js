"use strict";
/**
 * Shared Credential Definitions
 * Centralized location for all standard credentials used across service packages
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAICredential = exports.AWSCredential = void 0;
var aws_1 = require("./aws");
Object.defineProperty(exports, "AWSCredential", { enumerable: true, get: function () { return aws_1.AWSCredential; } });
var openai_1 = require("./openai");
Object.defineProperty(exports, "OpenAICredential", { enumerable: true, get: function () { return openai_1.OpenAICredential; } });
//# sourceMappingURL=index.js.map