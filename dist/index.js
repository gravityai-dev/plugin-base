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
exports.setPlatformDependencies = setPlatformDependencies;
exports.getPlatformDependencies = getPlatformDependencies;
exports.createPlugin = createPlugin;
exports.initializePlatformFromAPI = initializePlatformFromAPI;
// Global platform instance
let platformDeps = null;
/**
 * Set platform dependencies (called by plugin setup)
 */
function setPlatformDependencies(deps) {
    platformDeps = deps;
}
/**
 * Get platform dependencies (used by internal code)
 */
function getPlatformDependencies() {
    if (!platformDeps) {
        // Return stub implementations that won't crash at module load
        return {
            packageVersion: "1.0.24",
            PromiseNode: class {
                constructor(name) {
                    this.nodeType = 'stub';
                    this.logger = { info: () => { }, error: () => { }, debug: () => { } };
                }
                validateConfig(config) { return { success: true }; }
                executeNode(inputs, config, context) { return {}; }
                validateAndGetContext(context) { return { workflowId: '', executionId: '', nodeId: '' }; }
                getExecutionContext(context) {
                    return {
                        workflowId: '',
                        executionId: '',
                        nodeId: '',
                        nodeType: '',
                        config: {},
                        credentials: {}
                    };
                }
            },
            CallbackNode: class {
                constructor(name) { }
            },
            NodeInputType: {
                STRING: 'string',
                OBJECT: 'object',
                ARRAY: 'array',
                NUMBER: 'number',
                BOOLEAN: 'boolean'
            },
            NodeConcurrency: {
                SINGLE: 'single',
                MULTIPLE: 'multiple'
            },
            getNodeCredentials: () => Promise.resolve({}),
            getConfig: () => ({}),
            createLogger: () => ({ info: () => { }, error: () => { }, debug: () => { }, warn: () => { } }),
            saveTokenUsage: () => Promise.resolve(),
            getRedisClient: () => null,
            gravityPublish: () => Promise.resolve(),
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
        getRedisClient: api.getRedisClient,
        gravityPublish: api.gravityPublish,
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