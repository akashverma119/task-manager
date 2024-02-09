import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Create from "../components/organism/Create";
import List from "../components/organism/List";
import "../App.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../components/molecules/Navbar";
import userEvent from "@testing-library/user-event";
import { server } from "../mock/server";
import axios from "axios";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
beforeEach(() => {
  return render(
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
});
afterAll(() => server.close());

describe("Create page", () => {
  it("Post a task", async () => {
    const getSpy = jest.spyOn(axios, "post");
    const createButton = screen.getByRole("link", {
      name: /create/i,
    });
    expect(createButton).toBeInTheDocument();
    userEvent.click(createButton);
    const title = await screen.findByRole("textbox", {
      name: /title:/i,
    });
    expect(title).toBeInTheDocument();

    userEvent.type(title, "temp title");
    const createTaskButton = await screen.findByRole("button", {
      name: /create/i,
    });
    userEvent.click(createTaskButton);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("Check handleTitle working", async () => {
    const createButton = screen.getByRole("link", {
      name: /create/i,
    });
    expect(createButton).toBeInTheDocument();
    userEvent.click(createButton);
    const title = await screen.findByRole("textbox", {
      name: /title:/i,
    });
    userEvent.type(title, "New Title");
    expect(title).toHaveValue("New Title");

    const detail = await screen.findByRole("textbox", {
      name: /detail:/i,
    });
    userEvent.type(detail, "New Detail");
    expect(detail).toHaveValue("New Detail");
  });
});
