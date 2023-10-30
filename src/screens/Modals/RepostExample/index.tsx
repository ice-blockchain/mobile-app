// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {useNavigation} from '@react-navigation/native';
import {CloseIcon} from '@svg/CloseIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {rem} from 'rn-units';

const CLOSE_BUTTON_SIZE = rem(30);
const CLOSE_ICON_SIZE = rem(12);

export const RepostExample = () => {
  const navigation = useNavigation();
  const bottomOffsetStyle = useBottomOffsetStyle();

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.background}>
        <Animated.View
          entering={SlideInDown}
          {...stopPropagation}
          style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {t('social_kyc.instructions_step.example_title')}
            </Text>
            <Touchable style={styles.closeButton} onPress={navigation.goBack}>
              <CloseIcon color={COLORS.secondary} width={CLOSE_ICON_SIZE} />
            </Touchable>
          </View>
          <ScrollView
            style={bottomOffsetStyle.current}
            contentContainerStyle={styles.contentContainer}>
            <Image
              resizeMode={'center'}
              style={styles.imageContainer}
              source={Images.badges.socialKyc.exampleXRepost}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.transparentBackground,
    paddingTop: rem(150),
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: rem(20),
    paddingTop: rem(24),
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE / 2,
    backgroundColor: COLORS.wildSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: rem(24),
  },
  title: {
    ...font(14, 20, 'semibold', 'primaryDark', 'left'),
    textTransform: 'uppercase',
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: rem(16),
    borderColor: COLORS.primaryLight,
  },
});
