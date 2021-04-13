// __tests__/BusinessLocation.test.js

import React from "react";
import BusinessLocation from "../BusinessScreens/BusinessLocation";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusinessLocation />).toJSON();
  expect(tree).toMatchSnapshot();
});
