// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {WalkthroughStep} from '@store/modules/Walkthrough/types';
import {replaceString, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {useMemo} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';

type Props = {
  step: WalkthroughStep | undefined;
};

function getDescription(step: WalkthroughStep) {
  // When ice label is first in the description then any custom text styles are not applied
  // As a workaround adding a leading space here so text styles are applied
  if (step.description.startsWith('[[:ice]]')) {
    return ` ${step.description}`;
  }
  return step.description;
}

export function useParseDescription({step}: Props) {
  return useMemo(() => {
    if (!step) {
      return {parsedDescription: null};
    }

    let parsedDescription = replaceString(
      getDescription(step),
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

    if (step.link) {
      parsedDescription = replaceString(
        parsedDescription,
        tagRegex('link', false),
        (match, index) => {
          return (
            <Text
              key={match + index}
              style={styles.underlineText}
              onPress={() => {
                if (step.link) {
                  openLinkWithInAppBrowser({url: step.link});
                }
              }}>
              {match}
            </Text>
          );
        },
      );
    }

    return {parsedDescription};
  }, [step]);
}

const styles = StyleSheet.create({
  underlineText: {
    textDecorationLine: 'underline',
  },
});
