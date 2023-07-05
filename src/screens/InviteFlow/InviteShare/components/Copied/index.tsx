// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {rem, wait} from 'rn-units';

export type CopiedMethods = {
  updateVisibleState: (isVisible: boolean) => void;
};

export const Copied = forwardRef<CopiedMethods>(
  (_, forwardedRef: Ref<CopiedMethods>) => {
    const [inProgress, setInProgress] = useState(false);
    const [slideUpValue] = useState(new Animated.Value(0));

    const updateVisibleState = useCallback(
      (isVisible: boolean): void => {
        if (inProgress) {
          return;
        }
        setInProgress(true);
        Animated.timing(slideUpValue, {
          toValue: isVisible ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
          delay: isVisible ? 200 : 0,
        }).start(async () => {
          if (isVisible) {
            await wait(2000);
            setInProgress(false);
            updateVisibleState(false);
          } else {
            setInProgress(false);
          }
        });
      },
      [inProgress, slideUpValue],
    );

    useImperativeHandle(forwardedRef, () => ({updateVisibleState}));

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.copiedContainer,
            {
              transform: [
                {
                  translateY: slideUpValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -COPIED_CONTAINER_HEIGHT],
                  }),
                },
              ],
              opacity: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <Text style={styles.text}>{t('invite_share.copied')}</Text>
        </Animated.View>
      </View>
    );
  },
);

const COPIED_CONTAINER_HEIGHT = rem(20) * 2 + rem(12);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },
  copiedContainer: {
    borderRadius: 11,
    backgroundColor: COLORS.white,
    paddingHorizontal: rem(20),
    paddingVertical: rem(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font(14, 20, 'black', 'gulfBlue', 'center'),
  },
});
