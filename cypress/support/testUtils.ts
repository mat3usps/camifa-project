import { faker } from "@faker-js/faker";

export function createTestEmail(firstName?: string, lastName?: string) {
  return faker.internet.email(firstName, lastName, "example.com").toLowerCase();
}

export function createTestPassword() {
  return faker.internet.password();
}
