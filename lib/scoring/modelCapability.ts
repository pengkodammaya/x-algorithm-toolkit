import { GLM_MODEL } from "@/lib/env";

export type StructuredMode = "json_schema" | "tools";

export type ModelEntry = { id: string; mode: StructuredMode };

// The scorer runs on a single, known GLM model, so there's no capability
// probing to do. Function-calling (tools) is GLM's most reliable path for
// forced structured output.
export async function resolveModelChain(): Promise<ModelEntry[]> {
  return [{ id: GLM_MODEL, mode: "tools" }];
}

export function resetModelChainCache(): void {
  // No-op: the chain is static now. Kept for call-site compatibility.
}
