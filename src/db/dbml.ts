import { pgGenerate } from "drizzle-dbml-generator";

import * as schema from "./schema";

const out = "./schema.dbml";
const relational = false;

pgGenerate({ schema, out, relational });
