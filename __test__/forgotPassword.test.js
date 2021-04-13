// __tests__/Register-page.test.js

import React from "react";
import forgotPassword from "../screens/forgotPassword";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<forgotPassword />).toJSON();
  expect(tree).toMatchSnapshot();
});
