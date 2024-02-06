import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { server } from "./mock/server";
import axios from "axios";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("List page", () => {
  it("navbar task manager is visible", () => {
    render(<App />);
    const item = screen.getByRole("link", {
      name: /task manager app/i,
    });
    expect(item).toBeInTheDocument();
  });

  it("navbar task manager is visible", () => {
    render(<App />);
    const item = screen.getByRole("link", {
      name: /create/i,
    });
    expect(item).toBeInTheDocument();
  });

  it("task header is present", () => {
    render(<App />);
    const item = screen.getByRole("heading", {
      name: /your daily tasks/i,
    });
    expect(item).toBeInTheDocument();
  });

  it("task table header is present", async () => {
    render(<App />);
    const title = await screen.findByRole("columnheader", {
      name: /title/i,
    });
    const priority = await screen.findByRole("columnheader", {
      name: /priority/i,
    });
    const status = await screen.findByRole("columnheader", {
      name: /status/i,
    });

    expect(title).toBeInTheDocument();
    expect(priority).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  it("fetch the task from api", async () => {
    render(<App />);
    const tasks = await screen.findAllByRole("row");
    expect(tasks).toHaveLength(7);
  });

  it("Post a task", async () => {
    const getSpy = jest.spyOn(axios, "post");
    render(<App />);
    const createButton = screen.getByRole("link", {
      name: /create/i,
    });
    await userEvent.click(createButton);
    const title = await screen.findByRole("textbox", {
      name: /title:/i,
    });
    userEvent.type(title, "temp title");
    const submitButton = await screen.findByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitButton);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});
