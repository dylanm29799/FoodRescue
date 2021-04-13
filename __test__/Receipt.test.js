// __tests__/Receipt.test.js
//Not Working
import React from "react";
import Receipt from "../screens/Receipt";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<Receipt />).toJSON();
  expect(tree).toMatchSnapshot();
});
