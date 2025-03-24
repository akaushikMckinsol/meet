import * as supertest from "supertest";
const { faker } = require("@faker-js/faker");

const request = supertest("https://the-meet.com");

describe("POST /login", () => {
  // Positive Test Case 1: Successful login with valid credentials
  it("should login the user with valid credentials", async () => {
    const data = {
      loginemail: "akaushik@neuvays.net",
      loginpassword: "12345",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("token"); // Assuming response returns a token
    // expect(response.body).toHaveProperty("userId");
  });

  // Positive Test Case 2: Trimmed email and password should work
  it("should login the user with trimmed email and password", async () => {
    const data = {
      loginemail: "   akaushik@neuvays.net   ",
      loginpassword: "   12345   ",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(200);
  });

  // Positive Test Case 3: Case-insensitive email should work
  it("should allow login with case-insensitive email", async () => {
    const data = {
      loginemail: "AKAUSHIK@NEUVAYS.NET",
      loginpassword: "12345",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(200);
  });

  // Negative Test Case 1: Invalid email format
  it("should return 400 for invalid email format", async () => {
    const data = {
      loginemail: "invalid-email",
      loginpassword: "12345",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      code: 0,
      message: "Invalid email format",
    });
  });

  // Negative Test Case 2: Incorrect password
  it("should return 401 for incorrect password", async () => {
    const data = {
      loginemail: "akaushik@neuvays.net",
      loginpassword: "wrongpassword",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: 0,
      message: "Invalid email or password",
    });
  });

  // Negative Test Case 3: Non-existing email
  it("should return 404 for non-existing email", async () => {
    const data = {
      loginemail: "unknownuser@neuvays.net",
      loginpassword: "12345",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      code: 0,
      message: "User not found",
    });
  });

  // Negative Test Case 4: Missing email
  it("should return 400 for missing email", async () => {
    const data = {
      loginpassword: "12345",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(400);
    //   // expect(response.body).toEqual({
    //   //   code: 0,
    //   //   message: "Email is required",
    //   // });
  });

  // Negative Test Case 5: Missing password
  it("should return 400 for missing password", async () => {
    const data = {
      loginemail: "akaushik@neuvays.net",
    };

    const response = await request.post("/login").send(data);
    expect(response.status).toBe(400);
    // expect(response.body).toEqual({
    //   code: 0,
    //   message: "Password is required",
    // });
  });

  // Negative Test Case 6: Empty request body
  it("should return 400 for empty request body", async () => {
    const response = await request.post("/login").send({});
    expect(response.status).toBe(400);
    // expect(response.body).toEqual({
    //   code: 0,
    //   message: "Invalid request body",
    // });
  });

  // Negative Test Case 7: Attempt SQL injection
  // it("should return 400 for SQL injection attempt", async () => {
  //   const data = {
  //     loginemail: "' OR 1=1; --",
  //     loginpassword: "' OR 1=1; --",
  //   };

  //   const response = await request.post("/api/login").send(data);
  //   expect(response.status).toBe(400);
  //   expect(response.body).toEqual({
  //     code: 0,
  //     message: "Invalid email or password",
  //   });
  // });

  // Negative Test Case 8: Blocked user account
  // it("should return 403 for blocked user account", async () => {
  //   const data = {
  //     loginemail: "blocked@neuvays.net",
  //     loginpassword: "12345",
  //   };

  //   const response = await request.post("/api/login").send(data);
  //   expect(response.status).toBe(403);
  //   expect(response.body).toEqual({
  //     code: 0,
  //     message: "Account is blocked",
  //   });
  // });
});

describe("POST /register", () => {
  it("should register a user with valid data", async () => {
    const fakeUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      contactNo: faker.phone.number("+1##########"),
      companyName: faker.company.name(),
      designation: faker.person.jobTitle(),
      password: faker.internet.password(),
      confirmPassword: faker.internet.password(),
    };

    const response = await request
      .post("/newRegister")
      .send(fakeUser)
      .expect(200); // Adjust the expected status code if needed

    // expect(response.body).toHaveProperty(
    //   "message",
    //   "Registration successful"
    // );
  });
});
