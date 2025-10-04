/**
 * Unified Plugin Base and Platform Dependencies
 *
 * This file combines plugin interfaces with platform dependencies,
 * eliminating redundancy across plugin packages.
 */
/**
 * Plugin interface that packages must implement
 */
export interface GravityPlugin {
    name: string;
    version?: string;
    description?: string;
    setup(api: GravityPluginAPI): void | Promise<void>;
}
/**
 * API provided by Gravity to plugins
 */
export interface GravityPluginAPI {
    registerNode(node: PluginNodeDefinition): void;
    registerService(name: string, service: any): void;
    registerCredential(credential: any): void;
    createLogger(name: string): any;
    getConfig(): any;
    saveTokenUsage(usage: any): Promise<void>;
    getNodeCredentials(context: any, credentialName: string): Promise<any>;
    callService(method: string, params: any, context: any): Promise<any>;
    getRedisClient(): any;
    gravityPublish(channel: string, message: any): Promise<void>;
    getAudioWebSocketManager?: () => any;
    executeNodeWithRouting?: (executeNode: (inputs: any, config: any, context: any) => Promise<any>, params: any, config: any, context: any) => Promise<any>;
    classes: {
        PromiseNode: any;
        CallbackNode: any;
    };
    types: {
        NodeInputType: any;
        NodeConcurrency: any;
    };
}
/**
 * Node definition from a plugin
 */
export interface PluginNodeDefinition {
    definition: any;
    executor: any;
}
/**
 * Platform dependencies for internal use
 * These are injected by the plugin setup
 */
export interface PlatformDependencies {
    PromiseNode: any;
    CallbackNode: any;
    NodeInputType: any;
    NodeConcurrency: any;
    getNodeCredentials: (context: any, credentialName: string) => Promise<any>;
    getConfig: () => any;
    createLogger: (name: string) => any;
    saveTokenUsage: (usage: any) => Promise<void>;
    callService: (method: string, params: any, context: any) => Promise<any>;
    getRedisClient: () => any;
    gravityPublish: (channel: string, message: any) => Promise<void>;
    executeNodeWithRouting?: (executeNode: (inputs: any, config: any, context: any) => Promise<any>, params: any, config: any, context: any) => Promise<any>;
    getAudioWebSocketManager?: () => any;
    [key: string]: any;
}
export type NodeInputType = any;
export type NodeInput = any;
export type NodeOutput = any;
export type NodeDefinition = any;
export type NodeExecutor = any;
export type NodeExecutionContext = any;
export type NodeLifecycle = any;
export type WorkflowNode = any;
export type EnhancedNodeDefinition = any;
export type NodeCredential = any;
export type NodeConcurrency = any;
export type ValidationResult = any;
/**
 * Base class for Promise-based nodes
 * Import directly: import { PromiseNode } from "@gravityai-dev/plugin-base"
 */
export declare class PromiseNode {
    nodeType: string;
    logger: any;
    constructor(name: string);
    protected validateConfig(config: any): {
        success: boolean;
    };
    protected executeNode(inputs: any, config: any, context: any): {};
    protected validateAndGetContext(context: any): {
        workflowId: string;
        executionId: string;
        nodeId: string;
    };
    protected getExecutionContext(context: any): {
        workflowId: string;
        executionId: string;
        nodeId: string;
        nodeType: string;
        config: {};
        credentials: {};
    };
    execute(inputs: any, config: any, context: any): Promise<any>;
}
/**
 * Base class for Callback-based nodes
 * Import directly: import { CallbackNode } from "@gravityai-dev/plugin-base"
 */
export declare class CallbackNode {
    constructor(name: string);
}
/**
 * Node input type enum
 * Import directly: import { NodeInputType } from "@gravityai-dev/plugin-base"
 */
export declare const NodeInputType: {
    STRING: string;
    OBJECT: string;
    ARRAY: string;
    NUMBER: string;
    BOOLEAN: string;
};
/**
 * Node concurrency enum
 * Import directly: import { NodeConcurrency } from "@gravityai-dev/plugin-base"
 */
export declare const NodeConcurrency: {
    SINGLE: string;
    MULTIPLE: string;
};
/**
 * Set platform dependencies (called by plugin setup)
 * ONLY THE FIRST CALL IS ACCEPTED - prevents overwriting
 */
export declare function setPlatformDependencies(deps: PlatformDependencies): void;
/**
 * DEPRECATED - Use direct imports for base classes and context.api for runtime functions
 * @deprecated Will be removed in next major version
 */
export declare function getPlatformDependencies(): PlatformDependencies;
/**
 * Helper to create a plugin
 */
export declare function createPlugin(config: {
    name: string;
    version?: string;
    description?: string;
    setup: (api: GravityPluginAPI) => void | Promise<void>;
}): GravityPlugin;
/**
 * Initialize platform dependencies from plugin API
 */
export declare function initializePlatformFromAPI(api: GravityPluginAPI): void;
export * from "./types";
export * from "./credentials";
//# sourceMappingURL=index.d.ts.map