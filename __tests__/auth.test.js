const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");

beforeAll(async () => {
  try {
    let passowordHash = hashPassword("12345");
    await sequelize.queryInterface.bulkInsert("Users", [
      {
        email: "rizki@gmail.com",
        password: passowordHash,
        username: "rizki",
        name: "string",
        birthday: "string",
        height: 0,
        weight: 0,
        interests: '["empty"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log("Error during bulkInsert:", error);
  }
});


afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("POST for register", () => {
  test("POST /register return 201 create account", async () => {
    const dataBody = { email: "rizki123@gmail.com", password: "12345", username:"rizki" };

    const response = await request(app)
      .post("/api/register")
      .send(dataBody);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("message", expect.any(String));
    expect(response.body[0]).toHaveProperty("data", expect.any(Object));
  });

  test("POST /register return 400 email is required", async () => {
    const dataBody = { password: "12345",username:"rizki" };

    const response = await request(app)
      .post("/api/register")
      .send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /register return 400 passoword is required", async () => {
    const dataBody = { email: "bejo@gmail.com",username:"rizki" };

    const response = await request(app)
      .post("/api/register")
      .send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /register return 400 username is required", async () => {
    const dataBody = { email: "bejo@gmail.com",password:"12345" };

    const response = await request(app)
      .post("/api/register")
      .send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });


  test("POST /register return 400 format emai wrong", async () => {
    const dataBody = { email: "rizki@.com", password: "12345",username:"rizki" };

    const response = await request(app)
      .post("/api/register")
      .send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /register return 400 email must be unique", async () => {
    const dataBody = { email: "rizki@gmail.com", password: "12345",username:"rizki" };

    const response = await request(app)
      .post("/api/register")
      .send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("POST for login", () => {
  test("POST /login return 200 succes login", async () => {
    const dataBody = { email: "rizki@gmail.com", password: "12345" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("message", expect.any(String));
    expect(response.body[0]).toHaveProperty("data", expect.any(Object));
  });

  test("POST /login return 401 not registered", async () => {
    const dataBody = { email: "riz@gmail.com", password: "123456" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
