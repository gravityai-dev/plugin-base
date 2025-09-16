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
    getRedisClient(): any;
    gravityPublish(channel: string, message: any): Promise<void>;
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
    getRedisClient: () => any;
    gravityPublish: (channel: string, message: any) => Promise<void>;
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
 * Set platform dependencies (called by plugin setup)
 */
export declare function setPlatformDependencies(deps: PlatformDependencies): void;
/**
 * Get platform dependencies (used by internal code)
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