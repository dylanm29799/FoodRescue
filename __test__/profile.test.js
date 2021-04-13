// __tests__/profile.test.js

import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
