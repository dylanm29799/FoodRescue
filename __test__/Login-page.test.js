// __tests__/Login-page.test.js

import React from "react";
import Login from "../screens/LoginScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
