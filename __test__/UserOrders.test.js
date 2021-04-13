// __tests__/UserOrders.test.js

import React from "react";
import UserOrders from "../Screens/UserOrders";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

jest.mock("react-navigation", () => ({
  NavigationEvents: "mockNavigationEvents",
}));

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<UserOrders />).toJSON();
  expect(tree).toMatchSnapshot();
});
