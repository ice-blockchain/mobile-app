// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {font} from '@utils/styles';
import React from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const ActionSheet = () => {
  const {
    params: {title, buttons},
  } = useRoute<RouteProp<MainStackParamList, 'ActionSheet'>>();

  const navigation = useNavigation();
  const bottomOffsetStyle = useBottomOffsetStyle();

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.background}>
        <Animated.View
          {...stopPropagation}
          entering={SlideInDown}
          style={[styles.container, bottomOffsetStyle.current]}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.buttons}>
            {buttons.map((button, index) => (
              <Touchable
                key={index}
                onPress={() => {
                  navigation.goBack();
                  /** Its a modal dismiss collision, so without timeout Camera/Gallery
                   * picker will be closed immediately
                   * https://github.com/ivpusic/react-native-image-crop-picker/issues/1433
                   */
                  setTimeout(() => {
                    InteractionManager.runAfterInteractions(() => {
                      button.onPress();
                    });
                  }, 1000);
                }}>
                <View style={styles.button}>
                  <View style={styles.buttonIcon}>
                    {button.icon({
                      color: COLORS.primaryLight,
                      width: rem(24),
                      height: rem(24),
                    })}
                  </View>
                  <Text style={styles.buttonLabelText}>{button.label}</Text>
                </View>
              </Touchable>
            ))}
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    paddingTop: rem(30),
    paddingBottom: rem(38),
  },
  titleText: {
    ...font(14, 19, 'semibold', 'primaryDark'),
  },
  buttons: {
    marginTop: rem(20),
  },
  button: {
    flexDirection: 'row',
    marginRight: rem(30),
    alignItems: 'center',
    marginVertical: rem(10),
  },
  buttonIcon: {
    width: rem(44),
    height: rem(44),
    borderRadius: rem(12),
    backgroundColor: COLORS.linkWater,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabelText: {
    marginLeft: rem(12),
    ...font(16, 21, 'bold', 'primaryDark'),
  },
});
