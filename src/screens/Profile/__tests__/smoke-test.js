// SPDX-License-Identifier: BUSL-1.1

import {Profile} from '@screens/Profile';
import * as React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Profile />);
  expect(tree).toMatchSnapshot();
});
