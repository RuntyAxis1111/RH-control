import { createClient } from '@supabase/supabase-js';

// ⚠️ Claves embebidas (no usaremos secrets en Vercel)
const supabaseUrl = 'https://hqrobbmdvanuozzhjdun.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxcm9iYm1kdmFudW96emhqZHVuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDgyNjQ4OCwiZXhwIjoyMDY2NDAyNDg4fQ.1zNAVJPKi_l2xI5I3Xb5qEWO4CL1NTSTUAEyv9du6L4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      vacation_requests: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          status_while_away: 'OOO' | 'WFH' | 'Partial-Day' | 'Sick' | 'Parental-Leave' | 'Other';
          start_date: string;
          end_date: string;
          manager_email: string;
          comments: string | null;
          inserted_by: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          status_while_away: 'OOO' | 'WFH' | 'Partial-Day' | 'Sick' | 'Parental-Leave' | 'Other';
          start_date: string;
          end_date: string;
          manager_email: string;
          comments?: string | null;
          inserted_by?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          email?: string;
          status_while_away?: 'OOO' | 'WFH' | 'Partial-Day' | 'Sick' | 'Parental-Leave' | 'Other';
          start_date?: string;
          end_date?: string;
          manager_email?: string;
          comments?: string | null;
          inserted_by?: string | null;
        };
      };
      travel_notifications: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          division: string;
          start_date: string;
          end_date: string;
          destination: string;
          purpose: string;
          need_extra_expenses: boolean;
          extra_expenses_reason: string | null;
          extra_expenses_budget_usd: number | null;
          emergency_contact: string | null;
          emergency_phone: string | null;
          flight_info: string | null;
          hotel_info: string | null;
          inserted_by: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          division: string;
          start_date: string;
          end_date: string;
          destination: string;
          purpose: string;
          need_extra_expenses: boolean;
          extra_expenses_reason?: string | null;
          extra_expenses_budget_usd?: number | null;
          emergency_contact?: string | null;
          emergency_phone?: string | null;
          flight_info?: string | null;
          hotel_info?: string | null;
          inserted_by?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          email?: string;
          division?: string;
          start_date?: string;
          end_date?: string;
          destination?: string;
          purpose?: string;
          need_extra_expenses?: boolean;
          extra_expenses_reason?: string | null;
          extra_expenses_budget_usd?: number | null;
          emergency_contact?: string | null;
          emergency_phone?: string | null;
          flight_info?: string | null;
          hotel_info?: string | null;
          inserted_by?: string | null;
        };
      };
      it_equipment_requests: {
        Row: {
          id: string;
          created_at: string;
          requester: string;
          email: string;
          equipment: 'Laptop' | 'Monitor' | 'Keyboard' | 'Mouse' | 'Headset' | 'Dock' | 'Cable' | 'Adapter' | 'Other';
          notes: string | null;
          inserted_by: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          requester: string;
          email: string;
          equipment: 'Laptop' | 'Monitor' | 'Keyboard' | 'Mouse' | 'Headset' | 'Dock' | 'Cable' | 'Adapter' | 'Other';
          notes?: string | null;
          inserted_by?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          requester?: string;
          email?: string;
          equipment?: 'Laptop' | 'Monitor' | 'Keyboard' | 'Mouse' | 'Headset' | 'Dock' | 'Cable' | 'Adapter' | 'Other';
          notes?: string | null;
          inserted_by?: string | null;
        };
      };
    };
  };
};