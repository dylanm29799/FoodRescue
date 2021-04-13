// __tests__/AboutUs.test.js

import React from "react";
import AboutUs from "../screens/AboutUs";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<AboutUs />).toJSON();
  expect(tree).toMatchSnapshot();
});
