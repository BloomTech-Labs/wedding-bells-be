const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/config");

describe("Guests Router", () => {
	describe("GET /api/weddings/:weddingId/guests", () => {
		test("should return HTTP status code 200", async () => {
			const response = await request(server).get("/api/weddings/1/guests");
			expect(response.status).toBe(200);
		});
		test("should return an array of guests", async () => {
			const response = await request(server).get("/api/weddings/1/guests");
			expect(response.body).toBeInstanceOf(Array);
		});
	});

	describe("GET /api/weddings/:weddingId/guests/:id", () => {
		test("should return HTTP status code 200 if found", async () => {
			const response = await request(server).get(
				"/api/weddings/1/guests/40e6215d-b5c6-4896-987c-f30f3678f608"
			);
			expect(response.status).toBe(200);
		});
		test("should return a guest object if found", async () => {
			const response = await request(server).get(
				"/api/weddings/1/guests/40e6215d-b5c6-4896-987c-f30f3678f608"
			);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty(
				"id",
				"40e6215d-b5c6-4896-987c-f30f3678f608"
			);
			expect(response.body).toHaveProperty("name");
			expect(response.body).toHaveProperty("email");
			expect(response.body).toHaveProperty("is_going");
			expect(response.body).toHaveProperty("has_responded");
			expect(response.body).toHaveProperty("plus_one");
			expect(response.body).toHaveProperty("wedding_id");
		});
		test("should return HTTP status code 404 if not found", async () => {
			const nonexistentUUID = "78929338-50db-4cd9-907e-df7c82217a4c";
			const response = await request(server).get(
				`/api/weddings/1/guests/${nonexistentUUID}`
			);
			expect(response.status).toBe(404);
		});
	});
});
