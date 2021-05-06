/*
 *
 * ClassName: // __tests__/BusinessManage.test.js

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
import BusinessManage from "../BusinessScreens/BusinessManage";
import renderer from "react-test-renderer";
import { firebaseConfig } from "../config";
import * as firebase from "firebase";

firebase.initializeApp(firebaseConfig);
test("renders correctly", () => {
  const tree = renderer.create(<BusinessManage />).toJSON();
  expect(tree).toMatchSnapshot();
});
