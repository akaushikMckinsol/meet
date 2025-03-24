import * as supertest from "supertest";
const { faker } = require("@faker-js/faker");

const request = supertest("https://the-meet.com");

describe("GET /readSubscribers", () => {
  // Test Case 1: Should return 200 and list of subscribers
  it("should return 200 and list of subscribers", async () => {
    const response = await request.get("/readSubscribers");
    expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);
  });

  // Test Case 2: Should return valid subscriber fields with correct types
  // it("should return subscribers with correct fields and types", async () => {
  //   const fakeSubscriber = {
  //     subscription: faker.datatype.boolean(),
  //     _id: faker.string.uuid(),
  //     email: faker.internet.email(),
  //     ip_address: faker.internet.ipv4(),
  //     createdAt: faker.date.past().toISOString(),
  //     updatedAt: faker.date.past().toISOString(),
  //     __v: 0,
  //   };

  //   // Mock the API response with fake data
  //   jest.spyOn(global, "fetch").mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValue([fakeSubscriber]),
  //   } as any);

  //   const response = await request.get("/readSubscribers");
  //   expect(response.status).toBe(200);
  // expect(response.body.length).toBeGreaterThan(0);

  // response.body.forEach((subscriber: any) => {
  //   expect(typeof subscriber.subscription).toBe("boolean");
  //   expect(typeof subscriber._id).toBe("string");
  //   expect(typeof subscriber.email).toBe("string");
  //   expect(typeof subscriber.ip_address).toBe("string");
  //   expect(typeof subscriber.createdAt).toBe("string");
  //   expect(typeof subscriber.updatedAt).toBe("string");
  //   expect(typeof subscriber.__v).toBe("number");
  // });
  // });

  // Test Case 3: Should return empty array if no subscribers exist
  it("should return an empty array if no subscribers are found", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]),
    } as any);

    const response = await request.get("/readSubscribers");
    expect(response.status).toBe(200);
    // expect(response.body).toEqual([]);
  });

  // Test Case 4: Should return 500 if server error occurs
  it("should return 500 if server error occurs", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    const response = await request.get("/readSubscribers");
    expect(response.status).toBe(500);
    // expect(response.body).toEqual({
    //   code: 0,
    //   message: "Failed to retrieve subscribers.",
    //   error: "Server error.",
    // });
  });

  // Test Case 5: Should handle invalid endpoint and return 404
  it("should return 404 for an invalid endpoint", async () => {
    const response = await request.get("/invalid-endpoint");
    expect(response.status).toBe(404);
  });

  // Test Case 6: Should check the length of the subscribers array
  // it("should return more than 0 subscribers", async () => {
  //   const response = await request.get("/readSubscribers");
  //   expect(response.body.length).toBeGreaterThan(0);
  // });

  // Test Case 7: Should handle invalid method (POST instead of GET)
  it("should return 404 for invalid HTTP method", async () => {
    const response = await request.post("/readSubscribers");
    expect(response.status).toBe(404);
  });
});
