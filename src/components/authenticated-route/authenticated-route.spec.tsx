import { AuthenticatedRoute } from ".";
import React from "react";
import { Route } from "react-router-dom";
import { shallow } from "enzyme";

describe("<AuthenticatedRoute />", () => {
  it("Displays a react router <Route> if the current user is in a group specified by the groups prop", () => {
    jest.spyOn(React, "useContext").mockReturnValue({
      groups: ["foo", "bar"],
    });

    const wrapper = shallow(
      <AuthenticatedRoute path="/foo" groups={["foo"]} />
    );

    expect(wrapper.find(Route).exists()).toEqual(true);
  });

  it("Does not display a route if the current user is NOT in a group specified by the groups prop", () => {
    jest.spyOn(React, "useContext").mockReturnValue({
      groups: ["foo"],
    });

    const wrapper = shallow(
      <AuthenticatedRoute path="/foo" groups={["bar"]} />
    );

    expect(wrapper.find(Route).exists()).toEqual(false);
  });

  it("Passes the path and exact props through to the route component", () => {
    jest.spyOn(React, "useContext").mockReturnValue({
      groups: ["foo", "bar"],
    });

    const wrapper = shallow(
      <AuthenticatedRoute exact={true} path="/foo" groups={["foo"]} />
    );

    expect(wrapper.find(Route).props()).toEqual(
      expect.objectContaining({
        exact: true,
        path: "/foo",
      })
    );
  });
});
