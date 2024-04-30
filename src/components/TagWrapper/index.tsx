// SPDX-License-Identifier: ice License 1.0

import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';

type TagWrapperProps = {
  children: ReactNode;
};

export const TagWrapper = ({children}: TagWrapperProps) => {
  return (
    /**
     * on iOS if tag like [[:ice]] is fist in translation
     * some text props (like textAlign) will not work
     * without this hack
     * Example: "[[:ice]] is a digital currency"
     */
    <>
      <Text style={styles.stub}> </Text>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  stub: {
    fontSize: 1,
  },
});
