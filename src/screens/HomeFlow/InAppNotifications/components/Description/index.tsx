// SPDX-License-Identifier: ice License 1.0

import Markdown from '@ronradtke/react-native-markdown-display';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

interface DescriptionProps {
  value?: string | null;
}

export const Description = ({value = ''}: DescriptionProps) => {
  return (
    <View style={styles.descriptionContainer}>
      {value && (
        <Markdown
          style={{
            body: styles.description,
            paragraph: styles.markdown,
          }}>
          {value}
        </Markdown>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    flex: 1,
    marginRight: rem(70),
  },
  description: {
    ...font(14, 19, 'medium', 'primaryDark'),
  },
  markdown: {
    marginTop: 0,
    marginBottom: 0,
  },
});
