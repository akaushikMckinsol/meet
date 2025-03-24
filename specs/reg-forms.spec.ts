import * as supertest from "supertest";
const { faker } = require("@faker-js/faker");

const request = supertest("https://the-meet.com");

describe("POST /eventRegistration(individual)", () => {
  it("should register user with valid data and return 200", async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      asn: faker.string.alphanumeric(10),
      address: faker.location.streetAddress(),
      logoTerms: faker.string.uuid(),
      email: faker.internet.email(),
      phone: faker.string.numeric(10), // Generates a 10-digit phone number
      organisation: faker.company.name(),
      title: faker.person.jobTitle(),
      status: "virtual",
      eventAttend: "virtual",
      comment: faker.lorem.sentence(),
      termsPrivacy: true,
      termsContact: false,
      eventName: [faker.string.uuid()], // Generating random event IDs
    };

    const response = await request.post("/eventRegistration").send(payload);
    // .set("Accept", "application/json");

    // Assertions
    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("success", true);
    // expect(response.body).toHaveProperty(
    //   "message",
    //   "User registered successfully"
    // );
    // expect(response.body.data).toMatchObject({
    //   firstName: payload.firstName,
    //   lastName: payload.lastName,
    //   email: payload.email,
    //   phone: payload.phone,
    // });
  });

  it("should fail when required fields are missing", async () => {
    const payload = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organisation: "",
      title: "",
      status: "",
      eventAttend: "",
      termsPrivacy: false,
    };

    const response = await request
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");

    // Assertions
    expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty("success", false);
    // expect(response.body).toHaveProperty("message");
    // expect(response.body.errors).toBeInstanceOf(Array);
  });
});

describe("POST /corporateRegistration", () => {
  it("should register a user with valid data", async () => {
    const payload = {
      asn: faker.string.alphanumeric(10),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      phone: faker.string.numeric(10), // Generates a 10-digit phone number
      organisation: faker.company.name(),
      title: faker.person.jobTitle(),
      status: "inPerson",
      eventName: [faker.string.uuid()],
      eventAttend: "inPerson",
      comment: faker.lorem.sentence(),
      termsPrivacy: true,
      termsContact: false,
      logoTerms: true,
    };

    const response = await request
      .post("/corporateRegistration") // Replace with actual endpoint
      .send(payload);
    // .set("Accept", "application/json");

    // Assertions
    expect(response.status).toBe(200); // Assuming successful registration returns 201
    // expect(response.body).toHaveProperty("message", "Registration successful");
    // expect(response.body.data).toMatchObject({
    //   asn: payload.asn,
    //   email: payload.email,
    //   organisation: payload.organisation,
    //   status: payload.status,
    //   });
    // });

    //   it("should return 400 for missing required fields", async () => {
    //     const payload = {
    //       address: faker.location.streetAddress(),
    //       phone: faker.string.numeric(10),
    //       organisation: faker.company.name(),
    //     };

    //     const response = await request(app)
    //       .post("/register")
    //       .send(payload)
    //       .set("Accept", "application/json");

    //     expect(response.status).toBe(400); // Bad Request
    //     expect(response.body).toHaveProperty("error", "Missing required fields");
  });
});

describe("POST /sponsorRegistration", () => {
  it("should register a sponsor with valid data", async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      contact: faker.string.numeric(10), // Generates a 10-digit phone number
      jobTitle: faker.person.jobTitle(),
      seniority: faker.helpers.arrayElement([
        "Student",
        "Manager",
        "Director",
        "Executive",
      ]),
      jobFunction: faker.helpers.arrayElement([
        "E-Commerce or Digital",
        "Marketing",
        "Sales",
        "Finance",
      ]),
      websiteURL: faker.internet.url(),
      companyName: faker.company.name(),
      sponsorEventNames: [faker.string.uuid()], // Generates a fake UUID
    };

    const response = await request
      .post("/sponsorRegistration") // Replace with actual endpoint
      .send(payload);
    // .set('Accept', 'application/json');

    // Assertions
    expect(response.status).toBe(200); // Assuming successful registration returns 201
    //   expect(response.body).toHaveProperty('message', 'Registration successful');
    //   expect(response.body.data).toMatchObject({
    //     firstName: payload.firstName,
    //     lastName: payload.lastName,
    //     email: payload.email,
    //     jobTitle: payload.jobTitle,
    //     companyName: payload.companyName,
  });
  // });

  // it('should return 400 for missing required fields', async () => {
  //   const payload = {
  //     email: faker.internet.email(),
  //     companyName: faker.company.name()
  //   };

  //   const response = await request(app)
  //     .post('/register')
  //     .send(payload)
  //     .set('Accept', 'application/json');

  //   expect(response.status).toBe(400); // Bad Request
  //   expect(response.body).toHaveProperty('error', 'Missing required fields');
  // });

  it("should return 400 for invalid email format", async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "invalid-email", // Invalid email format
      contact: faker.string.numeric(10),
      jobTitle: faker.person.jobTitle(),
      seniority: "Student",
      jobFunction: "E-Commerce or Digital",
      websiteURL: faker.internet.url(),
      companyName: faker.company.name(),
      sponsorEventNames: [faker.string.uuid()],
    };

    const response = await request
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    //   expect(response.body).toHaveProperty('error', 'Invalid email format');
  });
});

describe("POST /speakerRegistration", () => {
  it("should register a speaker with valid data", async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      contact: faker.string.numeric(10), // Generates a 10-digit phone number
      jobTitle: faker.person.jobTitle(),
      seniority: faker.helpers.arrayElement([
        "VP Level (AVP, SVP, EVP)",
        "Manager",
        "Director",
        "Executive",
      ]),
      jobFunction: faker.helpers.arrayElement([
        "Data & Analytics",
        "Marketing",
        "Sales",
        "Finance",
      ]),
      websiteURL: faker.internet.url(),
      speakerEventNames: [faker.string.uuid()], // Generates a fake UUID for the event
      companyName: faker.company.name(),
    };

    const response = await request
      .post("/speakerRegistration") // Replace with actual endpoint
      .send(payload);
    // .set("Accept", "application/json");

    // Assertions
    //   expect(response.status).toBe(201); // Assuming successful registration returns 201
    //   expect(response.body).toHaveProperty("message", "Registration successful");
    //   expect(response.body.data).toMatchObject({
    //     firstName: payload.firstName,
    //     lastName: payload.lastName,
    //     email: payload.email,
    //     contact: payload.contact,
    //     jobTitle: payload.jobTitle,
    //     seniority: payload.seniority,
    //     jobFunction: payload.jobFunction,
    //     companyName: payload.companyName,
    //   });
  });

  it("should return 400 for missing required fields", async () => {
    const payload = {
      email: faker.internet.email(),
      contact: faker.string.numeric(10),
    };

    const response = await request
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");

    // Assertions
    expect(response.status).toBe(400); // Bad Request
    // expect(response.body).toHaveProperty("error", "Missing required fields");
  });

  it("should return 400 for invalid email format", async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "invalid-email", // Invalid email format
      contact: faker.string.numeric(10),
      jobTitle: faker.person.jobTitle(),
      seniority: "VP Level (AVP, SVP, EVP)",
      jobFunction: "Data & Analytics",
      websiteURL: faker.internet.url(),
      speakerEventNames: [faker.string.uuid()],
      companyName: faker.company.name(),
    };

    const response = await request
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");

    // Assertions
    expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty("error", "Invalid email format");
  });

  it("should return 400 for invalid phone number length", async () => {
    const payload = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      contact: faker.string.numeric(5), // Invalid phone length
      jobTitle: faker.person.jobTitle(),
      seniority: "VP Level (AVP, SVP, EVP)",
      jobFunction: "Data & Analytics",
      websiteURL: faker.internet.url(),
      speakerEventNames: [faker.string.uuid()],
      companyName: faker.company.name(),
    };

    const response = await request
      .post("/register")
      .send(payload)
      .set("Accept", "application/json");

    // Assertions
    expect(response.status).toBe(400);
    //   expect(response.body).toHaveProperty("error", "Invalid phone number");
  });
});

describe("GET /registrationsTypeBased", () => {
  //Test Case 1: Should return 200 and a list of registration types and counts
  it("should return 200 and list of registration types and counts", async () => {
    const response = await request.get("/registrationsTypeBased");
    expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);
  });

  //Test Case 2: Should return valid registration types and counts with correct types
  // it("should return registration types with correct fields and types", async () => {
  //   const fakeRegistration = [
  //     {
  //       type: faker.lorem.word(),
  //       count: faker.number.int({ min: 1, max: 1000 }),
  //     },
  //     {
  //       type: faker.lorem.word(),
  //       count: faker.number.int({ min: 1, max: 1000 }),
  //     },
  //   ];

  //   // Mock the API response with fake data
  //   jest.spyOn(global, "fetch").mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValue(fakeRegistration),
  //   } as any);

  //   const response = await request.get("/registrationsTypeBased");
  //   expect(response.status).toBe(200);

  //   // response.body.forEach((registration: any) => {
  //   //   expect(typeof registration.type).toBe("string");
  //   //   expect(typeof registration.count).toBe("number");
  //   // });
  // });

  // //Test Case 3: Should return empty array if no registration data exists
  // it("should return an empty array if no registration types are found", async () => {
  //   jest.spyOn(global, "fetch").mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValue([]),
  //   } as any);

  //   const response = await request.get("/registrationsTypeBased");
  //   expect(response.status).toBe(200);
  //   // expect(response.body).toEqual([]);
  // });

  //Test Case 4: Should return 500 if server error occurs
  // it("should return 500 if server error occurs", async () => {
  //   jest
  //     .spyOn(global, "fetch")
  //     .mockRejectedValueOnce(new Error("Internal Server Error"));

  //   const response = await request.get("/registrationsTypeBased");
  //   expect(response.status).toBe(500);
  //   // expect(response.body).toEqual({
  //   //   code: 0,
  //   //   message: "Failed to retrieve type-based registrations.",
  //   //   error: "Server error.",
  //   // });
  // });

  //  Test Case 5: Should handle invalid endpoint and return 404
  it("should return 404 for an invalid endpoint", async () => {
    const response = await request.get("/invalid-endpoint");
    expect(response.status).toBe(404);
  });

  //  Test Case 6: Should return at least one registration type
  it("should return more than 0 registration types", async () => {
    const response = await request.get("/registrationsTypeBased");
    expect(response.body.length).toBeGreaterThan(0);
  });

  //  Test Case 7: Should handle invalid HTTP method (POST instead of GET)
  it("should return 404 for invalid HTTP method", async () => {
    const response = await request.post("/registrationsTypeBased");
    expect(response.status).toBe(404);
  });
});
