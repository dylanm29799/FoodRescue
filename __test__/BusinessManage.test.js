// __tests__/BusinessManage.test.js

import React from "react";
import BusinessManage from "../BusinessScreens/BusinessManage";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusinessManage />).toJSON();
  expect(tree).toMatchSnapshot();
});
