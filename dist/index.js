"use strict";
/**
 * Unified Plugin Base and Platform Dependencies
 *
 * This file combines plugin interfaces with platform dependencies,
 * eliminating redundancy across plugin packages.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeConcurrency = exports.NodeInputType = exports.CallbackNode = exports.PromiseNode = void 0;
exports.setPlatformDependencies = setPlatformDependencies;
exports.getPlatformDependencies = getPlatformDependencies;
exports.createPlugin = createPlugin;
exports.initializePlatformFromAPI = initializePlatformFromAPI;
// ============================================================================
// DIRECT EXPORTS - Use these instead of getPlatformDependencies()
// ============================================================================
/**
 * Base class for Promise-based nodes
 * Import directly: import { PromiseNode } from "@gravityai-dev/plugin-base"
 */
class PromiseNode {
    constructor(name) {
        this.nodeType = "stub";
        this.logger = { info: () => { }, error: () => { }, debug: () => { } };
    }
    validateConfig(config) {
        return { success: true };
    }
    executeNode(inputs, config, context) {
        return {};
    }
    validateAndGetContext(context) {
        return { workflowId: "", executionId: "", nodeId: "" };
    }
    getExecutionContext(context) {
        return {
            workflowId: "",
            executionId: "",
            nodeId: "",
            nodeType: "",
            config: {},
            credentials: {},
        };
    }
    async execute(inputs, config, context) {
        return this.executeNode(inputs, config, context);
    }
}
exports.PromiseNode = PromiseNode;
/**
 * Base class for Callback-based nodes
 * Import directly: import { CallbackNode } from "@gravityai-dev/plugin-base"
 */
class CallbackNode {
    constructor(name) { }
}
exports.CallbackNode = CallbackNode;
/**
 * Node input type enum
 * Import directly: import { NodeInputType } from "@gravityai-dev/plugin-base"
 */
exports.NodeInputType = {
    STRING: "string",
    OBJECT: "object",
    ARRAY: "array",
    NUMBER: "number",
    BOOLEAN: "boolean",
};
/**
 * Node concurrency enum
 * Import directly: import { NodeConcurrency } from "@gravityai-dev/plugin-base"
 */
exports.NodeConcurrency = {
    SINGLE: "single",
    MULTIPLE: "multiple",
};
// Global platform instance
let platformDeps = null;
/**
 * Set platform dependencies (called by plugin setup)
 * ONLY THE FIRST CALL IS ACCEPTED - prevents overwriting
 */
function setPlatformDependencies(deps) {
    // Only set once - first plugin wins
    if (platformDeps !== null) {
        return; // Already set, ignore
    }
    platformDeps = deps;
}
/**
 * DEPRECATED - Use direct imports for base classes and context.api for runtime functions
 * @deprecated Will be removed in next major version
 */
function getPlatformDependencies() {
    // This function is only kept for backward compatibility
    // New code should:
    // 1. Import base classes directly: import { PromiseNode } from "@gravityai-dev/plugin-base"
    // 2. Use context.api for runtime functions: context.api.createLogger(), context.api.gravityPublish()
    if (!platformDeps) {
        // Return stub implementations that won't crash at module load
        return {
            packageVersion: "1.0.29",
            PromiseNode,
            CallbackNode,
            NodeInputType: exports.NodeInputType,
            NodeConcurrency: exports.NodeConcurrency,
            getConfig: () => ({}),
            createLogger: () => ({ info: () => { }, error: () => { }, debug: () => { }, warn: () => { } }),
            saveTokenUsage: () => Promise.resolve(),
            callService: () => Promise.resolve(null),
            getRedisClient: () => null,
            gravityPublish: async () => { },
            executeNodeWithRouting: async () => ({}),
            getAudioWebSocketManager: () => null,
        };
    }
    return platformDeps;
}
/**
 * Helper to create a plugin
 */
function createPlugin(config) {
    return config;
}
/**
 * Initialize platform dependencies from plugin API
 */
function initializePlatformFromAPI(api) {
    setPlatformDependencies({
        // Core dependencies from API
        PromiseNode: api.classes.PromiseNode,
        CallbackNode: api.classes.CallbackNode,
        NodeInputType: api.types.NodeInputType,
        NodeConcurrency: api.types.NodeConcurrency,
        getNodeCredentials: api.getNodeCredentials,
        getConfig: api.getConfig,
        createLogger: api.createLogger,
        saveTokenUsage: api.saveTokenUsage,
        callService: api.callService,
        getRedisClient: api.getRedisClient,
        gravityPublish: api.gravityPublish,
        executeNodeWithRouting: api.executeNodeWithRouting,
        getAudioWebSocketManager: api.getAudioWebSocketManager,
        // Type placeholders (not used at runtime)
        NodeInput: null,
        NodeOutput: null,
        NodeDefinition: null,
        NodeExecutor: null,
        NodeExecutionContext: null,
        NodeLifecycle: null,
        WorkflowNode: null,
        EnhancedNodeDefinition: null,
        NodeCredential: null,
        ValidationResult: null,
    });
}
// Export types
__exportStar(require("./types"), exports);
// Export shared credentials
__exportStar(require("./credentials"), exports);
//# sourceMappingURL=index.js.map