// SPDX-License-Identifier: ice License 1.0

import {BadgeCategory} from '@api/badges/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUpdateHiddenProfileElements} from '@store/modules/Account/hooks/useUpdateHiddenProfileElements';
import {ClosedEye} from '@svg/ClosedEye';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useCallback} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  title: string;
  category: BadgeCategory;
  progressText: string;
  progressValue: number;
  imageSource: ImageSourcePropType;
  imageInactive?: ImageSourcePropType;
  hidden?: boolean;
  isProfilePrivacyEditMode?: boolean;
};

export const BadgeCard = memo(
  ({
    imageSource,
    imageInactive,
    title,
    category,
    progressText,
    progressValue,
    hidden = false,
    isProfilePrivacyEditMode = false,
  }: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
    const {onUpdate} = useUpdateHiddenProfileElements();

    const onBadgePress = useCallback(() => {
      if (isProfilePrivacyEditMode) {
        onUpdate('badges');
      } else {
        navigation.navigate('Badges', {category});
      }
    }, [category, navigation, onUpdate, isProfilePrivacyEditMode]);

    return (
      <Touchable onPress={onBadgePress}>
        <View style={[styles.container, commonStyles.shadow]}>
          <Image
            source={hidden ? imageInactive || {} : imageSource}
            style={styles.icon}
            resizeMode={'contain'}
          />
          {!hidden ? (
            <>
              <Text
                style={styles.titleText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}>
                {title}
              </Text>
              <View style={styles.progressBody}>
                <View
                  style={[styles.progressValue, {width: `${progressValue}%`}]}
                />
              </View>
              <View style={styles.progressHeader}>
                <Text
                  style={styles.categoryText}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}>
                  {category}
                </Text>
                <Text style={styles.progressText}>{progressText}</Text>
              </View>
            </>
          ) : (
            <>
              <ClosedEye height={20} width={20} color={COLORS.secondary} />
              <Text style={styles.hiddenText} numberOfLines={1}>
                {t('profile.data_is_hidden')}
              </Text>
            </>
          )}
        </View>
      </Touchable>
    );
  },
);

export const BadgeCardSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

export const CARD_OFFSET = rem(7);

const styles = StyleSheet.create({
  container: {
    width: rem(135),
    height: rem(146),
    backgroundColor: COLORS.white,
    borderRadius: rem(14),
    marginHorizontal: CARD_OFFSET,
    marginVertical: CARD_OFFSET,
    alignItems: 'center',
    marginTop: rem(25),
  },
  titleText: {
    marginHorizontal: rem(6),
    ...font(14, 17, 'bold', 'primaryDark'),
  },
  progressHeader: {
    flexDirection: 'row',
    marginHorizontal: rem(10),
    marginBottom: rem(8),
  },
  icon: {
    height: rem(92),
    width: rem(135),
    marginTop: -rem(25),
    marginBottom: rem(15),
  },
  categoryText: {
    flex: 1,
    ...font(12, 14, 'regular', 'primaryDark'),
  },
  progressText: {
    ...font(12, 14, 'regular', 'periwinkleGray'),
  },
  progressBody: {
    height: rem(9),
    borderRadius: rem(4),
    backgroundColor: COLORS.secondaryFaint,
    marginHorizontal: rem(10),
    alignSelf: 'stretch',
    marginTop: rem(13),
    marginBottom: rem(9),
  },
  progressValue: {
    height: rem(9),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
  hiddenText: {
    marginTop: rem(7),
    ...font(14, 17, 'bold', 'secondary'),
  },
});
