// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {windowHeight, windowWidth} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useKycStepRepostExampleUrl} from '@screens/Modals/RepostExample/hooks/useKycStepRepostExampleUrl';
import {CloseIcon} from '@svg/CloseIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {rem} from 'rn-units';

const CLOSE_BUTTON_SIZE = rem(30);
const CLOSE_ICON_SIZE = rem(12);
const DEFAULT_ASPECT_RATIO = 0.6179775280898876;

const HEADER_PADDING_TOP = rem(24);
const IMAGE_PADDING_TOP = rem(24);
const IMAGE_PADDING_BOTTOM = rem(24);
const IMAGE_PADDING_HORIZONTAL = rem(16);
const TOP_OFFSET = HEADER_PADDING_TOP + CLOSE_BUTTON_SIZE + IMAGE_PADDING_TOP;
const IMAGE_WIDTH = windowWidth - IMAGE_PADDING_HORIZONTAL * 2;

export const RepostExample = () => {
  const navigation = useNavigation();
  const {
    params: {kycStep},
  } = useRoute<RouteProp<MainStackParamList, 'RepostExample'>>();
  const bottomOffsetStyle = useBottomOffsetStyle();
  const {bottom: bottomInset} = useSafeAreaInsets();
  const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO);
  const imageUrl = useKycStepRepostExampleUrl(kycStep);
  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => {
      setAspectRatio(width / height);
    });
  }, [imageUrl]);
  const imageHeight = IMAGE_WIDTH / aspectRatio;
  const sheetTopOffset =
    windowHeight -
    imageHeight -
    bottomInset -
    TOP_OFFSET -
    IMAGE_PADDING_BOTTOM;
  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={[styles.background, {paddingTop: sheetTopOffset}]}>
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
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
          <View style={[bottomOffsetStyle.current, styles.contentContainer]}>
            <Image
              style={[
                styles.imageContainer,
                {width: IMAGE_WIDTH, height: imageHeight},
              ]}
              source={{uri: imageUrl}}
            />
          </View>
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
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: rem(20),
    paddingTop: HEADER_PADDING_TOP,
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
    paddingTop: IMAGE_PADDING_TOP,
    paddingBottom: IMAGE_PADDING_BOTTOM,
    paddingHorizontal: IMAGE_PADDING_HORIZONTAL,
  },
  title: {
    ...font(14, 20, 'semibold', 'primaryDark', 'left'),
    textTransform: 'uppercase',
  },
  imageContainer: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    borderColor: COLORS.primaryLight,
  },
});
