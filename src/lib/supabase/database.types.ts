/**
 * Tipos do banco de dados Supabase
 *
 * Este arquivo é um placeholder. Quando o projeto Supabase estiver conectado,
 * execute: npx supabase gen types typescript --local > src/lib/supabase/database.types.ts
 *
 * Para gerar tipos do projeto remoto:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      // Placeholder - as tabelas serão definidas nas migrations
      _example: {
        Row: {
          id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
