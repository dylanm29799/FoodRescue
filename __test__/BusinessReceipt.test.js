// __tests__/BusinessProfile.test.js

import React from "react";
import BusinessReceipt from "../BusinessScreens/businessReceipt";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusinessReceipt />).toJSON();
  expect(tree).toMatchSnapshot();
});
