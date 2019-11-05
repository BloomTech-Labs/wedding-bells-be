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
});
