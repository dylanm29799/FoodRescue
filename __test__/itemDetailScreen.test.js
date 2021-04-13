// __tests__/itemDetailScreen.test.js

import React from "react";
import itemDetailScreen from "../screens/itemDetailScreen";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<itemDetailScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
