// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
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
    <View style={[styles.container, bottomOffset.current]}>
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

const CONTAINER_TOP_RADIUS = rem(30);

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: CONTAINER_TOP_RADIUS,
    borderTopRightRadius: CONTAINER_TOP_RADIUS,
    backgroundColor: COLORS.white,
  },
  buttonsContainer: {
    marginTop: rem(12),
    marginHorizontal: rem(12),
    marginBottom: rem(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginTop: rem(24),
    width: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
