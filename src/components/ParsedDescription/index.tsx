// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {replaceString, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';

type Props = {
  description: string;
  link?: string;
};

export function getParsedDescription({description, link}: Props) {
  const parsedDescription = replaceString(
    description,
    tagRegex('ice'),
    (match, index) => (
      <IceLabel
        key={match + index}
        iconOffsetY={Platform.select({
          ios: 0,
          default: 4,
        })}
      />
    ),
  );

  if (link) {
    return replaceString(
      parsedDescription,
      tagRegex('link', false),
      (match, index) => {
        return (
          <Text
            key={match + index}
            style={styles.underlineText}
            onPress={() => {
              if (link) {
                openLinkWithInAppBrowser({url: link});
              }
            }}>
            {match}
          </Text>
        );
      },
    );
  }

  return parsedDescription;
}

export function ParsedDescription(props: Props) {
  return <Text>{getParsedDescription(props)}</Text>;
}

const styles = StyleSheet.create({
  underlineText: {
    textDecorationLine: 'underline',
  },
});
