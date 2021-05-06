/*
 *
 * ClassName: // __tests__/BusinessAddProduct.test.js
 *
 * Date: 28/04/2021
 *
 *
 * @author: Dylan Murphy, X17506166
 *
 * @reference : https://docs.expo.io/guides/testing-with-jest/
 * @reference : https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-1-f782c4e30101
 *
 */
import React from "react";
import BusinessAddProduct from "../BusinessScreens/BusinessAddProduct";
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
  const tree = renderer.create(<BusinessAddProduct />).toJSON();
  expect(tree).toMatchSnapshot();
});
