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
  // Registration methods
  registerNode(node: PluginNodeDefinition): void;
  registerService(name: string, service: any): void;
  registerCredential(credential: any): void;
  
  // Platform utilities
  createLogger(name: string): any;
  getConfig(): any;
  saveTokenUsage(usage: any): Promise<void>;
  getNodeCredentials(context: any, credentialName: string): Promise<any>;
  callService(method: string, params: any, context: any): Promise<any>;
  getRedisClient(): any; // For reading from Redis
  gravityPublish(channel: string, message: any): Promise<void>;
  
  // Audio WebSocket support (optional)
  getAudioWebSocketManager?: () => any;
  
  // Workflow execution utilities
  executeNodeWithRouting?: (
    executeNode: (inputs: any, config: any, context: any) => Promise<any>,
    params: any,
    config: any,
    context: any
  ) => Promise<any>;
  
  // Base classes for extending
  classes: {
    PromiseNode: any;
    CallbackNode: any;
  };
  
  // Type definitions and enums
  types: {
    NodeInputType: any;
    NodeConcurrency: any;
  };
}

/**
 * Node definition from a plugin
 */
export interface PluginNodeDefinition {
  definition: any; // EnhancedNodeDefinition
  executor: any; // Node executor class or instance
}

/**
 * Platform dependencies for internal use
 * These are injected by the plugin setup
 */
export interface PlatformDependencies {
  // Base classes
  PromiseNode: any;
  CallbackNode: any;
  
  // Type enums
  NodeInputType: any;
  NodeConcurrency: any;
  
  // Platform functions
  getNodeCredentials: (context: any, credentialName: string) => Promise<any>;
  getConfig: () => any;
  createLogger: (name: string) => any;
  saveTokenUsage: (usage: any) => Promise<void>;
  callService: (method: string, params: any, context: any) => Promise<any>;
  getRedisClient: () => any; // For reading from Redis
  gravityPublish: (channel: string, message: any) => Promise<void>;
  
  // Workflow execution
  executeNodeWithRouting?: (
    executeNode: (inputs: any, config: any, context: any) => Promise<any>,
    params: any,
    config: any,
    context: any
  ) => Promise<any>;
  
  // Audio WebSocket support (optional)
  getAudioWebSocketManager?: () => any;
  
  // Allow additional properties for compatibility
  [key: string]: any;
}

// Type exports for compile-time usage
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


// Global platform instance
let platformDeps: PlatformDependencies | null = null;

/**
 * Set platform dependencies (called by plugin setup)
 */
export function setPlatformDependencies(deps: PlatformDependencies) {
  platformDeps = deps;
}

/**
 * Get platform dependencies (used by internal code)
 */
export function getPlatformDependencies(): PlatformDependencies {
  if (!platformDeps) {
    // Return stub implementations that won't crash at module load
    return {
    packageVersion: "1.0.26",
      PromiseNode: class {
        constructor(name: string) {}
        protected validateConfig(config: any) { return { success: true }; }
        protected executeNode(inputs: any, config: any, context: any) { return {}; }
        protected validateAndGetContext(context: any) { return { workflowId: '', executionId: '', nodeId: '' }; }
        protected getExecutionContext(context: any) { 
          return { 
            workflowId: '', 
            executionId: '', 
            nodeId: '', 
            nodeType: '', 
            config: {}, 
            credentials: {} 
          }; 
        }
        nodeType = 'stub';
        logger = { info: () => {}, error: () => {}, debug: () => {} };
      },
      CallbackNode: class {
        constructor(name: string) {}
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
      getConfig: () => ({}),
      createLogger: () => ({ info: () => {}, error: () => {}, debug: () => {}, warn: () => {} }),
      saveTokenUsage: () => Promise.resolve(),
      callService: () => Promise.resolve(null),
      getRedisClient: () => null,
      gravityPublish: async () => {},
      executeNodeWithRouting: async () => ({}),
      getAudioWebSocketManager: () => null,
    } as any;
  }
  return platformDeps;
}

/**
 * Helper to create a plugin
 */
export function createPlugin(config: {
  name: string;
  version?: string;
  description?: string;
  setup: (api: GravityPluginAPI) => void | Promise<void>;
}): GravityPlugin {
  return config;
}

/**
 * Initialize platform dependencies from plugin API
 */
export function initializePlatformFromAPI(api: GravityPluginAPI) {
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
  } as any);
}

// Export types
export * from "./types";

// Export shared credentials
export * from "./credentials";
