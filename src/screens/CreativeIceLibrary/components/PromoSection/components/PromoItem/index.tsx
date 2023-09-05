// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export type PromoItemActionData = {
  actionText: string;
  actionLink: string;
};

export type PromoItemData = {
  image: ImageRequireSource;
  title: string;
  description: string;
  actions: PromoItemActionData[];
};

type Props = {
  data: PromoItemData;
};

export function PromoItem({data}: Props) {
  return (
    <View style={styles.container}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.actionsContainer}>
        {data.actions.map((actionData: PromoItemActionData) => (
          <Touchable
            key={actionData.actionText}
            style={styles.action}
            onPress={() => {
              openLinkWithInAppBrowser({url: actionData.actionLink});
            }}>
            <Text style={styles.actionText}>{actionData.actionText}</Text>
          </Touchable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: rem(16),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    marginBottom: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  title: {
    paddingTop: rem(16),
    ...font(16, 22, 'bold', 'primaryDark'),
  },
  description: {
    paddingTop: rem(12),
    ...font(14, null, 'regular', 'emperor'),
  },
  actionsContainer: {
    paddingTop: rem(12),
    flexDirection: 'row',
  },
  action: {
    marginEnd: rem(20),
  },
  actionText: {
    textDecorationLine: 'underline',
    ...font(14, null, 'regular', 'primaryLight'),
  },
  image: {
    alignSelf: 'center',
  },
});
