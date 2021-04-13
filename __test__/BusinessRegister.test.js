// __tests__/BusinessRegister.test.js

import React from "react";
import BusReg from "../BusinessScreens/BusinessRegister";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusReg />).toJSON();
  expect(tree).toMatchSnapshot();
});
