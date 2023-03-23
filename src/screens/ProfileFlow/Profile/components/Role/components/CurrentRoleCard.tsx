// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useUpdateHiddenProfileElements} from '@store/modules/Account/hooks/useUpdateHiddenProfileElements';
import {ClosedEye} from '@svg/ClosedEye';
import {RightArrowSvg} from '@svg/RightArrow';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  user?: User | null;
  imageSource: ImageSourcePropType;
  onNextPress?: () => void;
  imageSourceHidden?: ImageSourcePropType;
  isProfilePrivacyEditMode?: boolean;
};

export const CurrentRoleCard = ({
  title,
  description,
  imageSource,
  onNextPress,
  imageSourceHidden,
  isProfilePrivacyEditMode = false,
  user,
}: Props) => {
  const {onUpdate} = useUpdateHiddenProfileElements();

  const hidden = user?.hiddenProfileElements?.includes('role');
  return (
    <View
      style={[
        styles.outerContainer,
        isProfilePrivacyEditMode && styles.editModeOuterContainer,
      ]}>
      <View style={styles.innerContainer}>
        <Touchable
          onPress={
            isProfilePrivacyEditMode
              ? () => {
                  onUpdate('role');
                }
              : onNextPress
          }>
          <View style={styles.container}>
            <Image
              source={hidden ? imageSourceHidden || {} : imageSource}
              style={hidden ? styles.iconHidden : styles.icon}
            />
            <View style={styles.info}>
              {hidden ? (
                <View style={styles.hiddenContainer}>
                  <ClosedEye height={24} width={24} />
                  <Text style={styles.hiddenText}>
                    {t('global.data_hidden')}
                  </Text>
                </View>
              ) : (
                <>
                  <Text
                    style={styles.titleText}
                    numberOfLines={2}
                    adjustsFontSizeToFit={true}>
                    {title}
                  </Text>
                  <Text
                    style={styles.descriptionText}
                    numberOfLines={2}
                    adjustsFontSizeToFit={true}>
                    {description}
                  </Text>
                </>
              )}
            </View>
            {!isProfilePrivacyEditMode && (
              <RightArrowSvg style={styles.arrowNext} />
            )}
          </View>
        </Touchable>
      </View>
    </View>
  );
};

export const CurrentRoleSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.container} />
      </View>
    </View>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(20),
    height: rem(69),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(4),
  },
  editModeOuterContainer: {
    backgroundColor: COLORS.white02opacity,
  },
  icon: {
    marginLeft: rem(10),
    height: rem(94),
    width: rem(94),
    marginBottom: rem(28),
  },
  iconHidden: {
    marginLeft: rem(16),
    height: rem(80),
    width: rem(80),
    marginBottom: rem(28),
  },
  info: {
    flex: 1,
    marginLeft: rem(10),
    justifyContent: 'center',
    marginTop: rem(4),
  },
  titleText: {
    ...font(20, 21, 'semibold'),
  },
  descriptionText: {
    marginTop: rem(3),
    ...font(12, 14.4, 'regular'),
  },
  arrowNext: {
    marginRight: rem(24),
  },
  hiddenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenText: {
    marginLeft: rem(8),
    marginRight: rem(24),
    ...font(14, 16.8, 'bold'),
  },
  innerContainer: {
    paddingTop: rem(28),
    paddingBottom: rem(8),
    paddingHorizontal: rem(10),
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
  },
  outerContainer: {
    paddingHorizontal: rem(10),
    paddingVertical: rem(10),
    borderRadius: rem(20),
  },
});
