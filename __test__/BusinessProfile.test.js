// __tests__/BusinessProfile.test.js

import React from "react";
import BusinessProfile from "../BusinessScreens/BusinessProfile";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusinessProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});
