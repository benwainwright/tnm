import React from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { mock as mockExtended } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { act, render, fireEvent } from "@testing-library/react";
import MenuLink from "./MenuLink";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useHistory: jest.fn(),
  };
});

describe("<MenuLink>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds to the history array when clicked", () => {
    const mockHistoryArray = mockExtended<History>();
    mocked(useHistory, true).mockReturnValue(mockHistoryArray);
    const { getByText } = render(<MenuLink to="/foo-route">Click Me</MenuLink>);
    act(() => {
      fireEvent.click(getByText("Click Me"));
    });
    expect(mockHistoryArray.push).toHaveBeenCalledWith("/foo-route");
  });
});
