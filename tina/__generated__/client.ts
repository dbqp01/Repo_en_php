import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '6729d478069a42f1fb272b2e8870256a088168ff', queries,  });
export default client;
  