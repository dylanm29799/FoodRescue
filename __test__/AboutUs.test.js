/*
 *
 * ClassName: // __tests__/AboutUs.test.js
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
import AboutUs from "../screens/AboutUs";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<AboutUs />).toJSON();
  expect(tree).toMatchSnapshot();
});
