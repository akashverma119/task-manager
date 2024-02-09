import { rest } from "msw";
import { fakedata } from "../data/data";
export const handlers = [
  rest.get("http://localhost:3600/tasks", (req, res, ctx) => {
    return res(ctx.json(fakedata));
  }),
  rest.post("http://localhost:3600/tasks", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put("http://localhost:3600/tasks/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete("http://localhost:3600/tasks/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
