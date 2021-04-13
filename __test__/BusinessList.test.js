// __tests__/BusinessList.test.js

import React from "react";
import BusinessListScreen from "../screens/BusinessListScreen";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusinessListScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
