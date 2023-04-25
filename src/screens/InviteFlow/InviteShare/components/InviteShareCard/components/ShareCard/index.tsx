// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {ShareButton as ShareButtonComponent} from '@screens/InviteFlow/InviteShare/components/InviteShareCard/components/ShareButton';
import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export type ShareButton<P> = {
  type: string;
  title: string;
  icon: number;
  onPress: (p: P) => Promise<void>;
};

type Props<P> = {
  buttons: ShareButton<P>[];
  onButtonPress: (button: ShareButton<P>) => void;
  children?: ReactNode;
};

export const ShareCard = <P,>({buttons, onButtonPress, children}: Props<P>) => {
  const bottomOffset = useBottomOffsetStyle();

  return (
    <View
      style={[
        styles.shareCard,
        commonStyles.baseSubScreen,
        bottomOffset.current,
      ]}>
      {children}
      <View style={styles.buttonsContainer}>
        {buttons.map(button => (
          <ShareButtonComponent
            title={button.title}
            icon={button.icon}
            key={button.type}
            onPress={() => onButtonPress(button)}
            style={styles.button}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shareCard: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: rem(12),
    marginTop: rem(12),
    marginBottom: rem(20),
    backgroundColor: COLORS.white,
  },
  button: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(24),
  },
});
