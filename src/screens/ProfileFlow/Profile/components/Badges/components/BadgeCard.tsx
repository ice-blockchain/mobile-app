// SPDX-License-Identifier: ice License 1.0

import {BadgeType} from '@api/achievements/types';
import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUpdateHiddenProfileElements} from '@store/modules/Account/hooks/useUpdateHiddenProfileElements';
import {ClosedEye} from '@svg/ClosedEye';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, useCallback} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  userId?: string;
  title?: string;
  category?: BadgeType;
  index?: number;
  lastIndex?: number;
  hidden?: boolean;
  isProfilePrivacyEditMode?: boolean;
  style?: StyleProp<ViewStyle>;
  isPlaceholder?: boolean;
};

export const BadgeCard = memo(
  ({
    userId = '',
    title = '',
    category = 'social',
    index = 0,
    lastIndex = 0,
    hidden = false,
    isProfilePrivacyEditMode = false,
    isPlaceholder = false,
    style,
  }: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
    const {onUpdate} = useUpdateHiddenProfileElements();

    const onBadgePress = useCallback(() => {
      if (isProfilePrivacyEditMode) {
        onUpdate('badges');
      } else {
        navigation.navigate('Badges', {category, userId});
      }
    }, [category, isProfilePrivacyEditMode, onUpdate, navigation, userId]);

    const categoryTranslation = t(`profile.badge_types.${category}.title`);

    const image =
      `${category}${index}_achieved_true` as keyof typeof Images.badges;
    const inactiveImage = isPlaceholder
      ? (`placeholder${index}` as keyof typeof Images.badges)
      : (`${category}0_achieved_false` as const);

    const ActiveImage = Images.badges[image];
    const InactiveImage = Images.badges[inactiveImage];

    const value = index + 1;
    const total = lastIndex + 1;

    const progressValue = (value * 100) / total;
    const isEnglishLocale = useIsEnglishLocale();

    return (
      <Touchable onPress={onBadgePress}>
        <View style={[styles.container, commonStyles.shadow, style]}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={hidden ? InactiveImage : ActiveImage}
          />
          {hidden ? (
            <>
              <ClosedEye
                height={rem(20)}
                width={rem(20)}
                color={COLORS.secondary}
              />
              <Text style={styles.hiddenText} numberOfLines={1}>
                {t('profile.data_is_hidden')}
              </Text>
            </>
          ) : (
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
                <Text style={styles.categoryText} numberOfLines={1}>
                  {categoryTranslation}
                </Text>
                <AnimatedNumberText
                  value={value}
                  style={styles.progressText}
                  textDecorator={animatedValue =>
                    isEnglishLocale
                      ? `${t('profile.progress_text', {
                          value: formatNumber(animatedValue),
                          total,
                        })}`
                      : `${formatNumber(animatedValue)} / ${total}`
                  }
                />
              </View>
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
    ...font(14, 19, 'bold', 'primaryDark'),
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
    marginBottom: rem(10),
  },
  categoryText: {
    flex: 1,
    ...font(12, 15, 'regular', 'primaryDark'),
  },
  progressText: {
    ...font(12, 15, 'regular', 'periwinkleGray'),
  },
  progressBody: {
    height: rem(9),
    borderRadius: rem(4),
    backgroundColor: COLORS.secondaryFaint,
    marginHorizontal: rem(10),
    alignSelf: 'stretch',
    marginVertical: rem(10),
  },
  progressValue: {
    height: rem(9),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
  hiddenText: {
    marginTop: rem(7),
    ...font(14, 19, 'bold', 'secondary'),
  },
});
