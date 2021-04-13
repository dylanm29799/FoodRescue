// __tests__/CartScreen.test.js

import React from "react";
import CartScreen from "../screens/CartScreen";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<CartScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
