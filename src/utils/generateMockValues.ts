import { faker } from "@faker-js/faker";
import type { Schema, SchemaDict } from "../types";

export function generateMockValue(schema: Schema): any {
  switch (schema.type) {
    case "string":
      if (schema.format === "email") {
        return faker.internet.email();
      } else if (schema.format === "url") {
        return faker.internet.url();
      } else if (schema.format === "uuid") {
        return faker.datatype.uuid();
      } else {
        return faker.lorem.word();
      }
    case "number":
      return faker.number.int();
    case "boolean":
      return faker.datatype.boolean();
    case "array":
      if (schema.items) {
        return [generateMockValue(schema.items)];
      }
      return [];
    case "file":
      if (schema.format === "image") {
        return faker.image.url();
      } else if (schema.format === "images") {
        return [faker.image.url(), faker.image.url()];
      }
      return null;
    case "object":
      if (schema.properties) {
        const obj: { [key: string]: any } = {};
        for (const key in schema.properties) {
          obj[key] = generateMockValue(schema.properties[key]);
        }
        return obj;
      }
      return {};
    default:
      return null;
  }
}

export function generateMockValues(schemaDict: SchemaDict): {
  [key: string]: any;
} {
  const result: { [key: string]: any } = {};
  for (const key in schemaDict) {
    result[key] = generateMockValue(schemaDict[key]);
  }
  return result;
}
