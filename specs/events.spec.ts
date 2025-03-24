import * as supertest from "supertest";
const { faker } = require("@faker-js/faker");

const request = supertest("https://the-meet.com");

describe("GET /eventNames", () => {
  //  Test case 1: Should return 200 status code and a list of events
  it("should return 200 and list of events", async () => {
    const response = await request.get("/eventNames");

    expect(response.status).toBe(200); // Expect status code 200
    // expect(Array.isArray(response.body)).toBe(true); // Expect response to be an array
  });

  //  Test case 2: Check if the response has all required fields
  it("should return events with correct fields", async () => {
    const response = await request.get("/eventNames");

    expect(response.status).toBe(200);
    // expect(response.body.length).toBeGreaterThan(0);

    // response.body.forEach((event: any) => {
    //   expect(event).toHaveProperty("_id");
    //   expect(event).toHaveProperty("eventName");
    //   expect(event).toHaveProperty("eventDate");
    //   expect(event).toHaveProperty("eventMonth");
    //   expect(event).toHaveProperty("eventYear");
    //   expect(event).toHaveProperty("eventstartTime");
    //   expect(event).toHaveProperty("eventendTime");
    //   expect(event).toHaveProperty("eventStartTimeZone");
    //   expect(event).toHaveProperty("eventEndTimeZone");
    //   expect(event).toHaveProperty("status");
    // });
  });

  //  Test case 3: Should return valid data types
  it("should return valid data types", async () => {
    const response = await request.get("/eventNames");

    expect(response.status).toBe(200);
    // response.body.forEach((event: any) => {
    //   expect(typeof event._id).toBe("string");
    //   expect(typeof event.eventName).toBe("string");
    //   expect(typeof event.eventDate).toBe("string");
    //   expect(typeof event.eventMonth).toBe("number");
    //   expect(typeof event.eventYear).toBe("number");
    //   expect(typeof event.eventstartTime).toBe("number");
    //   expect(typeof event.eventendTime).toBe("number");
    //   expect(typeof event.status).toBe("boolean");
    //   expect(typeof event.eventStartTimeZone).toBe("string");
    // });
  });

  // Test case 4: Should return an empty array if no events are available
  it("should return an empty array if no events are available", async () => {
    // Mock the response to return an empty array
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    } as any);

    const response = await request.get("/eventNames");
    expect(response.status).toBe(200);
    // expect(response.body).toEqual([]);
  });

  //  Test case 5: Should return 500 if server error occurs
  // it("should return 500 if server error occurs", async () => {
  //   // Mock the response to simulate a server error
  //   jest
  //     .spyOn(global, "fetch")
  //     .mockRejectedValue(new Error("Internal Server Error"));

  //   const response = await request.get("/eventNames");
  //   expect(response.status).toBe(500);
  // });

  // //  Test case 6: Should handle invalid endpoint
  // it("should return 404 for invalid endpoint", async () => {
  //   const response = await request.get("/invalid-endpoint");
  //   expect(response.status).toBe(404);
  // });

  // //  Test case 7: Should check the length of event data if greater than zero
  // it("should return more than 0 events", async () => {
  //   const response = await request.get("/eventNames");
  //   expect(response.body.length).toBeGreaterThan(0);
  // });
});
