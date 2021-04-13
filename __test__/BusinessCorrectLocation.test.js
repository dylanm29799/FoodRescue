// __tests__/BusinessCorrectLocation.test.js

import React from "react";
import CorrectLocation from "../BusinessScreens/CorrectLocation";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);

jest.mock("react-navigation", () => ({
  withNavigation: (Component) => (props) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
}));

test("renders correctly", () => {
  const tree = renderer.create(<CorrectLocation />).toJSON();
  expect(tree).toMatchSnapshot();
});
