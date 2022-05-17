// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '@screens/AuthFlow/Intro';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
