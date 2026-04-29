import { cache } from "react";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

const REQUIRED_TABLES = [
  "courses",
  "posts",
  "profiles",
  "certificates",
  "contact_submissions",
  "enrollment_requests",
] as const;

type RequiredTable = (typeof REQUIRED_TABLES)[number];

export type SupabaseSchemaStatus =
  | {
      status: "ready";
      missingTables: [];
    }
  | {
      status: "missing_env";
      missingTables: [];
    }
  | {
      status: "missing_schema";
      missingTables: string[];
    }
  | {
      status: "error";
      missingTables: string[];
      message: string;
    };

export const getSupabaseSchemaStatus = cache(async (): Promise<SupabaseSchemaStatus> => {
  if (!isSupabaseConfigured()) {
    return {
      status: "missing_env",
      missingTables: [],
    };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const checks = await Promise.all(
      REQUIRED_TABLES.map(async (table) => {
        const { error } = await supabase.from(table).select("id").limit(1);
        return error?.code === "PGRST205" ? table : null;
      }),
    );

    const missingTables = checks.filter((table): table is RequiredTable => table !== null);

    if (missingTables.length > 0) {
      return {
        status: "missing_schema",
        missingTables,
      };
    }

    return {
      status: "ready",
      missingTables: [],
    };
  } catch (error) {
    return {
      status: "error",
      missingTables: [],
      message: error instanceof Error ? error.message : "Unknown Supabase error",
    };
  }
});
