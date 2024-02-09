import { render, screen, within } from "@testing-library/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Create from "../components/organism/Create";
import List from "../components/organism/List";
import Detail from "../components/organism/Detail";
import "../App.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../components/molecules/Navbar";
import userEvent from "@testing-library/user-event";
import { server } from "../mock/server";
import axios from "axios";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

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
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
});
afterAll(() => server.close());

describe("Details page", () => {
  it("See a task", async () => {
    const task = await screen.findByRole("link", {
      name: /my first task/i,
    });
    userEvent.click(task);

    const statusText = await screen.findByLabelText(/status:/i);
    expect(statusText).toBeInTheDocument();

    const titleText = await screen.findByLabelText(/title:/i);
    expect(titleText).toBeInTheDocument();

    const detailText = await screen.findByLabelText(/detail:/i);
    expect(detailText).toBeInTheDocument();

    const priorityText = await screen.findByLabelText(/priority:/i);
    expect(priorityText).toBeInTheDocument();

    const deadlineText = await screen.findByLabelText(/deadline:/i);
    expect(deadlineText).toBeInTheDocument();
  });

  it("See a task details", async () => {
    const statusText = await screen.findByRole("combobox", {
      name: /status:/i,
    });
    expect(statusText).toHaveValue("Pending");

    const titleText = await screen.findByRole("textbox", {
      name: /title:/i,
    });
    expect(titleText).toHaveValue("My first task");

    const detailText = await screen.findByRole("textbox", {
      name: /detail:/i,
    });
    expect(detailText).toHaveValue(
      "lorem ipsum this is the first task details"
    );

    const priorityText = await screen.findByRole("combobox", {
      name: /priority:/i,
    });
    expect(priorityText).toHaveValue("urgent");

    const deadlineText = await screen.findByLabelText(/deadline:/i);
    expect(deadlineText).toHaveValue("2024-01-22T13:32");
  });

  it("checking handlePriority working", async () => {
    const getSpy = jest.spyOn(axios, "put");
    const dropdowns = await screen.findAllByRole("combobox");
    expect(dropdowns).toHaveLength(2);
    const optionsElective = await within(dropdowns[1]).findByRole("option", {
      name: "elective",
    });
    expect(optionsElective).toBeInTheDocument();
    const editButton = screen.getByRole("button", {
      name: /edit/i,
    });
    userEvent.selectOptions(dropdowns[1], optionsElective);
    userEvent.click(editButton);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("checking handleStatus working", async () => {
    const getSpy = jest.spyOn(axios, "put");
    await new Promise((r) => setTimeout(r, 1000));
    const task = await screen.findByRole("link", {
      name: /my first task/i,
    });
    expect(task).toBeInTheDocument();
    await userEvent.click(task);
    const dropdowns = await screen.findAllByRole("combobox");
    expect(dropdowns).toHaveLength(2);
    const optionsPending = await within(dropdowns[0]).findByRole("option", {
      name: "Pending",
    });
    expect(optionsPending).toBeInTheDocument();
    const editButton = screen.getByRole("button", {
      name: /edit/i,
    });
    userEvent.selectOptions(dropdowns[0], optionsPending);
    userEvent.click(editButton);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("checking handleTitle working", async () => {
    const getSpy = jest.spyOn(axios, "put");
    await new Promise((r) => setTimeout(r, 1000));
    const task = await screen.findByRole("link", {
      name: /my first task/i,
    });
    expect(task).toBeInTheDocument();
    await userEvent.click(task);
    const title = await screen.findByRole("textbox", {
      name: /title:/i,
    });
    userEvent.type(title, "hello");
    const editButton = screen.getByRole("button", {
      name: /edit/i,
    });
    userEvent.click(editButton);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("checking handleDetail working", async () => {
    const getSpy = jest.spyOn(axios, "put");
    await new Promise((r) => setTimeout(r, 1000));
    const task = await screen.findByRole("link", {
      name: /my first task/i,
    });
    expect(task).toBeInTheDocument();
    await userEvent.click(task);
    const detail = await screen.findByRole("textbox", {
      name: /detail:/i,
    });
    userEvent.type(detail, "hello");
    const editButton = screen.getByRole("button", {
      name: /edit/i,
    });
    userEvent.click(editButton);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});
