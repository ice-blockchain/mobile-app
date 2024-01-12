// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {ProgressBar} from '@components/ProgressBar';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {replaceString, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {isAndroid, rem} from 'rn-units';

type Props = {
  title: string;
  description: string | ReactNode;
  progressPercentage: number;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

export const BigHeader = ({
  title,
  description,
  progressPercentage,
  containerStyle,
  titleStyle,
  descriptionStyle,
}: Props) => {
  const topOffset = useTopOffsetStyle({
    extraOffset: hasNotch() ? rem(0) : rem(25),
  });
  return (
    <View style={styles.shrimpArea}>
      <View style={[styles.container, topOffset.current, containerStyle]}>
        <View style={styles.body}>
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>
          <Text style={[styles.descriptionText, descriptionStyle]}>
            {typeof description === 'string'
              ? replaceString(description, tagRegex('ice'), (match, index) => (
                  <IceLabel
                    key={match + index}
                    iconSize={18}
                    iconOffsetY={isAndroid ? 4 : 3}
                  />
                ))
              : description}
          </Text>
        </View>
        <ProgressBar
          valuePercentage={progressPercentage}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shrimpArea: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: rem(20),
    marginBottom: rem(12),
  },
  body: {
    flex: 1,
  },
  titleText: {
    ...font(32, 40, 'black'),
    width: rem(202),
  },
  descriptionText: {
    marginTop: rem(16),
    ...font(14, 19, 'medium', 'wildSand'),
    width: rem(210),
  },
  progressBar: {
    marginLeft: rem(24),
    marginTop: rem(16),
    width: rem(62),
  },
});
