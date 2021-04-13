// __tests__/BusinessCurrentProduct.test.js

import React from "react";
import BusinessCurrentProduct from "../BusinessScreens/BusinessCurrentProduct";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
jest.mock("react-navigation", () => ({
  withNavigation: (Component) => (props) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
}));
test("renders correctly", () => {
  const tree = renderer.create(<BusinessCurrentProduct />).toJSON();
  expect(tree).toMatchSnapshot();
});
