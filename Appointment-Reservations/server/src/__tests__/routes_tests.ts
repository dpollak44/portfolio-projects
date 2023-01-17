// import { Request, Response } from "express";
import request from "supertest";
import app from "../index";
import 'jest';

describe('Sanity test', () => {
    test('1 should equal 1', () => {
      expect(1).toBe(1)
    })
  })

describe('Auth endpoint', () => {
  test('should login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        id: 123456789012,
        type: "Provider"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body.message).toEqual('Provider logged in successfully');
    expect(res.body.status).toEqual('success');
  })
})



  