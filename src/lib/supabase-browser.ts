import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for builds without env vars
    return {
      auth: {
        signInWithPassword: async () => ({ data: {}, error: new Error("Supabase not configured") }),
        signUp: async () => ({ data: {}, error: new Error("Supabase not configured") }),
        signOut: async () => {},
        getUser: async () => ({ data: { user: null } }),
      },
    } as unknown as ReturnType<typeof createBrowserClient>;
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export { createClient };
