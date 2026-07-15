import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/akim/Desktop/migracion a php/tina/__generated__/.cache/1784125239919', url: 'https://content.tinajs.io/2.4/content/mock-client-id/github/main', token: 'mock-token', queries,  });
export default client;
  