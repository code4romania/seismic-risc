import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

afterEach(cleanup);

describe("App component", () => {
  it("should render correctly", () => {
    const container = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
