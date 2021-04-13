// __tests__/BusinessHome.test.js

import React from "react";
import BusinessHome from "../BusinessScreens/BusinessHome";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);

test("renders correctly", () => {
  const tree = renderer.create(<BusinessHome />).toJSON();
  expect(tree).toMatchSnapshot();
});
