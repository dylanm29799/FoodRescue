// __tests__/Receipt.test.js

import React from "react";
import SortScreen from "../screens/SortScreen";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<SortScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
