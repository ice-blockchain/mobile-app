import 'react-native';
import React from 'react';
import Component from '../index';
import renderer from 'react-test-renderer';

it(`${Component.name} renders correctly`, () => {
  renderer.create(<Component />);
});
