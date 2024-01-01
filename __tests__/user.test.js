const request = require("supertest");
const app = require("../app");
const { sequelize,User } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");


let token;
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


  let user = await User.findByPk(1);

  let payload = {
    id: user.id,
  };

  token = encodedJson(payload);

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


describe("POST for create profile", () => {
  test("POST /api/craeteProfile return 201 create account", async () => {
    const dataBody = {  name: "iki",
                        birthday: "18-02-2001",
                        height: 80,
                        weight: 90,
                        interests: ["bola","kaki"], };

    const response = await request(app)
      .post("/api/createProfile")
      .send(dataBody)
      .set("access_token", token);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("message", expect.any(String));
    expect(response.body[0]).toHaveProperty("data", expect.any(Object));
  });

  test("POST /api/createProfile return 400 any field is required/null", async () => {
    const dataBody = {  name: null,
                        birthday: "18-02-2001",
                        height: 80,
                        weight: 90,
                        interests: ["bola","kaki"], };

    const response = await request(app)
      .post("/api/createProfile")
      .send(dataBody)
      .set("access_token", token);;

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /api/createProfile return 401 no token", async () => {
    const dataBody = {  name: null,
      birthday: "18-02-2001",
      height: 80,
      weight: 90,
      interests: ["bola","kaki"], };

    const response = await request(app)
      .post("/api/createProfile")
      .send(dataBody);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("GET for get profile", () => {
  test("GET /api/getProfile return 200 get profile", async () => {
    const response = await request(app).get("/api/getProfile").set("access_token", token);;

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("message", expect.any(String));
    expect(response.body[0]).toHaveProperty("data", expect.any(Object));
  });

  test("GET /api/getProfile return 401 no token", async () => {
    const response = await request(app)
      .get("/api/getProfile");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});


describe("PUT for update profile", () => {
  test("PUT /api/updateProfile return 200 update account", async () => {
    const dataBody = {  name: "ura",
                        birthday: "18-02-2001",
                        height: 80,
                        weight: 90,
                        interests: ["bola","kaki"], };

    const response = await request(app)
      .put("/api/updateProfile")
      .send(dataBody)
      .set("access_token", token);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("message", expect.any(String));
    expect(response.body[0]).toHaveProperty("data", expect.any(Object));
  });

  test("PUT /api/updateProfile return 400 any field is required/null", async () => {
    const dataBody = {  name: null,
                        birthday: "18-02-2001",
                        height: 80,
                        weight: 90,
                        interests: ["bola","kaki"], };

    const response = await request(app)
      .put("/api/updateProfile")
      .send(dataBody)
      .set("access_token", token);;

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("PUT /api/updateProfile return 401 no token", async () => {
    const dataBody = {  name: null,
      birthday: "18-02-2001",
      height: 80,
      weight: 90,
      interests: ["bola","kaki"], };

    const response = await request(app)
      .put("/api/updateProfile")
      .send(dataBody);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});