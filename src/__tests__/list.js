import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import List from "../components/organism/List";
import "../App.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../components/molecules/Navbar";
import userEvent from "@testing-library/user-event";
import { server } from "../mock/server";
import axios from "axios";
import { fakedata } from "../data/data";

beforeAll(() => server.listen());
beforeEach(() => {
  return render(
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<List />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("List page", () => {
  it("navbar task manager is visible", () => {
    const item = screen.getByRole("link", {
      name: /task manager app/i,
    });
    expect(item).toBeInTheDocument();
  });

  it("navbar create is visible", () => {
    const item = screen.getByRole("link", {
      name: /create/i,
    });
    expect(item).toBeInTheDocument();
  });

  it("navbar profile is visible", () => {
    const item = screen.getByRole("link", { name: /profile/i });
    expect(item).toBeInTheDocument();
  });

  it("task header is present", () => {
    const item = screen.getByRole("heading", {
      name: /your daily tasks/i,
    });
    expect(item).toBeInTheDocument();
  });

  it("task table header is present", async () => {
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
    const taskRows = await screen.findAllByRole("row");
    expect(taskRows).toHaveLength(fakedata.length + 1);
  });

  it("delete button present", async () => {
    const deleteButtons = await screen.findAllByRole("button");
    expect(deleteButtons).toHaveLength(fakedata.length);
  });

  it("checking search", async () => {
    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "My first");
    const taskRows = await screen.findAllByRole("row");
    expect(taskRows).toHaveLength(2);
    userEvent.clear(searchBox);
  });

  it("checking filter priority", async () => {
    await new Promise((r) => setTimeout(r, 10));
    const dropdowns = await screen.findAllByRole("combobox");
    const optionsElective = await within(dropdowns[0]).findByRole("option", {
      name: "elective",
    });
    userEvent.selectOptions(dropdowns[0], optionsElective);
    const taskRows = await screen.findAllByRole("row");
    expect(taskRows).toHaveLength(4);

    const optionsNone = await within(dropdowns[0]).findByRole("option", {
      name: "none",
    });

    userEvent.selectOptions(dropdowns[0], optionsNone);
    const anothertaskRows = await screen.findAllByRole("row");
    expect(anothertaskRows).toHaveLength(7);
  });

  it("checking delete", async () => {
    const getSpy = jest.spyOn(axios, "delete");
    const deleteButtons = await screen.findAllByRole("button");
    userEvent.click(deleteButtons[0]);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("checking setPriority working", async () => {
    await new Promise((r) => setTimeout(r, 10));
    const dropdowns = await screen.findAllByRole("combobox");
    const optionsElective = await within(dropdowns[1]).findByRole("option", {
      name: "elective",
    });
    expect(optionsElective).toBeInTheDocument();
    const getSpy = jest.spyOn(axios, "put");
    userEvent.selectOptions(dropdowns[1], optionsElective);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("checking setStatus working", async () => {
    await new Promise((r) => setTimeout(r, 10));
    const dropdowns = await screen.findAllByRole("combobox");
    const optionsPending = await within(dropdowns[2]).findByRole("option", {
      name: "Pending",
    });
    expect(optionsPending).toBeInTheDocument();
    const getSpy = jest.spyOn(axios, "put");
    userEvent.selectOptions(dropdowns[2], optionsPending);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("checking setDealine working", async () => {
    await new Promise((r) => setTimeout(r, 10));
    const getSpy = jest.spyOn(axios, "put");
    const dateTime = await screen.findByDisplayValue(/2024\-01\-22t13:32/i);
    expect(dateTime).toBeInTheDocument();
    fireEvent.change(dateTime, { target: { value: "2024-01-23T14:32" } });
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});
