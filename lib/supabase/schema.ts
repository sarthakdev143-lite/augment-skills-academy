import { cache } from "react";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

const REQUIRED_TABLES = {
  courses: ["id"],
  posts: ["id"],
  profiles: ["id"],
  certificates: ["id"],
  contact_submissions: ["id", "phone"],
  enrollment_requests: ["id", "phone"],
} as const;

type RequiredTable = keyof typeof REQUIRED_TABLES;

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
      Object.entries(REQUIRED_TABLES).map(async ([table, requiredColumns]) => {
        const { error } = await supabase.from(table).select(requiredColumns.join(",")).limit(1);

        if (error?.code === "PGRST205" || error?.code === "PGRST204") {
          return table as RequiredTable;
        }

        if (error?.message?.includes("schema cache")) {
          return table as RequiredTable;
        }

        return null;
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
