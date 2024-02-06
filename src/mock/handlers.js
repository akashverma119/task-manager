import { rest, http } from "msw";
import { fakedata } from "../data/data";
export const handlers = [
  rest.get("http://localhost:3600/tasks", (req, res, ctx) => {
    return res(ctx.json(fakedata));
  }),
  rest.post("http://localhost:3600/tasks", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("http://localhost:3600/tasks/:id", (req, res, ctx) => {
    const id = req?.params?.id;
    if (id <= fakedata.length && id >= 1) return res(ctx.json(fakedata));
    else return res(ctx.status(303));
  }),
];
