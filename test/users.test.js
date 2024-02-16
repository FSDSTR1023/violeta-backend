const request = require("supertest");
const express = require('express');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const usersController = require('../controllers/users.controller');

require('dotenv').config();

const mongoServer = new MongoMemoryServer();

describe("Integration Tests", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await mongoServer.start();
    await mongoose.createConnection(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should pass", () => {
    expect(true).toBe(true);
  });

  it("should fail", () => {
    expect(1 + 2).not.toEqual(5);
  });

  it("has to connect to MongoDB", async () => {
    const dbConnection = await mongoose.connection;
    expect(dbConnection.readyState).toBe(1);
  });

  it("has to return status 200 when calling the index endpoint", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });

  it("should call getAllUsers controller", async () => {
    const req = { method: 'GET', url: '/' };
    const res = { status: jest.fn(), json: jest.fn() };
    await usersController.getAllUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
