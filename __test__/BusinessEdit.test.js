// __tests__/BusinessEdit.test.js

import React from "react";
import BusinessEditProduct from "../BusinessScreens/BusinessEditProduct";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);

test("renders correctly", () => {
  const tree = renderer.create(<BusinessEditProduct />).toJSON();
  expect(tree).toMatchSnapshot();
});
