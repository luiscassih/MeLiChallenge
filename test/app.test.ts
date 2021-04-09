import request from 'supertest';
import { app } from "../src/app";
const authorMock = {
  name: "Luis",
  lastname: "Cassih"
}
describe("Items API", () => {
  test("POST /api/items?search=nintendo should return 4 items", async () => {
    const result = await request(app).post("/api/items?search=nintendo").send({author: authorMock});
    expect(result.status).toBe(200);
    expect(result.body.items.length).toBe(4);
  });
  test("POST /api/items?search= should return 0 items", async () => {
    const result = await request(app).post("/api/items?search=").send({author: authorMock});
    expect(result.status).toBe(200);
    expect(result.body.items.length).toBe(0);
  });
  test("POST /api/items should return 0 items", async () => {
    const result = await request(app).post("/api/items").send({author: authorMock});
    expect(result.status).toBe(200);
    expect(result.body.items.length).toBe(0);
  });
  test("POST /api/item/null should return 404", async () => {
    const result = await request(app).post("/api/items/null").send({author: authorMock});
    expect(result.status).toBe(404);
  });
  test("POST /api/items without author should return 400 bad request", async () => {
    const result = await request(app).post("/api/items").send();
    expect(result.status).toBe(400);
  });
});

describe("View Tests", () => {
  test("GET /null should return 404", async () => {
    const result = await request(app).get("/null");
    expect(result.status).toBe(404);
  });
});