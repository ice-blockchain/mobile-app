// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useUpdateHiddenProfileElements} from '@store/modules/Account/hooks/useUpdateHiddenProfileElements';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {ClosedEye} from '@svg/ClosedEye';
import {RightArrowSvg} from '@svg/RightArrow';
import {t} from '@translations/i18n';
import {font, mirrorTransform} from '@utils/styles';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  user?: User | null;
  imageSource: ImageSourcePropType;
  onNextPress?: () => void;
  imageSourceHidden?: ImageSourcePropType;
  isProfilePrivacyEditMode?: boolean;
  isOwner?: boolean;
};

export const CurrentRoleCard = ({
  title,
  description,
  imageSource,
  onNextPress,
  imageSourceHidden,
  isProfilePrivacyEditMode = false,
  user,
  isOwner,
}: Props) => {
  const {onUpdate} = useUpdateHiddenProfileElements();
  const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);

  const isRoleHidden = !!user?.hiddenProfileElements?.includes('role');
  const hidden = isOwner ? isRoleHidden && !isPrivacyInfoShown : isRoleHidden;
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
                  <ClosedEye height={rem(24)} width={rem(24)} />
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
            {!isProfilePrivacyEditMode && isOwner && (
              <RightArrowSvg style={styles.arrowNext} />
            )}
          </View>
        </Touchable>
      </View>
    </View>
  );
};

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
    ...font(20, 24, 'semibold'),
  },
  descriptionText: {
    marginTop: rem(3),
    ...font(12, 16, 'regular'),
  },
  arrowNext: {
    marginRight: rem(24),
    ...mirrorTransform(),
  },
  hiddenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenText: {
    marginLeft: rem(8),
    marginRight: rem(24),
    ...font(14, 19, 'bold'),
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
