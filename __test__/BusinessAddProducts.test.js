// __tests__/BusinessAddProduct.test.js

import React from "react";
import BusinessAddProduct from "../BusinessScreens/BusinessAddProduct";
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
  const tree = renderer.create(<BusinessAddProduct />).toJSON();
  expect(tree).toMatchSnapshot();
});
