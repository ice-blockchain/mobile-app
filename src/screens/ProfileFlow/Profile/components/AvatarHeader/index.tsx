// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {Avatar, AvatarSkeleton} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {useActionSheetUpdateAvatar} from '@hooks/useActionSheetUpdateAvatar';
import {useUpdateAvatar} from '@hooks/useUpdateAvatar';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import {QRCodeShareButton} from '@navigation/components/Header/components/QRCodeShareButton';
import {SettingsButton} from '@navigation/components/Header/components/SettingsButton';
import {ShowPrivacyButton} from '@navigation/components/Header/components/ShowPrivacyButton';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {useVerifiedTooltip} from '@screens/HomeFlow/Home/components/Header/components/hooks/useVerifiedTooltip';
import {AgendaContactTooltip} from '@screens/ProfileFlow/Profile/components/AvatarHeader/components/AgendaContactTooltip';
import {ContactsAvatarButton} from '@screens/ProfileFlow/Profile/components/AvatarHeader/components/ContactsAvatarButton';
import {EditAvatarButton} from '@screens/ProfileFlow/Profile/components/AvatarHeader/components/EditAvatarButton';
import {VERIFIED_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader/constants';
import {
  AVATAR_RADIUS,
  AVATAR_SMALL_SIZE,
  TEXT_MARGIN_LEFT,
  useAnimatedStyles,
} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useAnimatedStyles';
import {useUpdateAvatarRouteParams} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useUpdateAvatarRouteParam';
import {useUserContactDetails} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useUserContactDetails';
import {VerifiedSvg} from '@svg/Verified';
import {font, mirrorTransform} from '@utils/styles';
import {buildUsernameWithPrefix} from '@utils/username';
import React, {memo, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {rem} from 'rn-units';

import {useOnLayout} from './hooks/useOnLayout';

const NOT_FOUND = require('../../assets/images/notFoundPlaceholder.png');

export const AVATAR_SIZE = rem(122);

type Props = {
  user: User | null;
  animatedIndex: SharedValue<number>;
  isOwner: boolean;
  isLoading?: boolean;
};

export const AvatarHeader = memo(
  ({user, animatedIndex, isOwner, isLoading = false}: Props) => {
    const topOffset = useTopOffsetStyle();
    const {chevronRef, showTooltip} = useVerifiedTooltip(-1);

    const uri = user?.profilePictureUrl;

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const {
      navigationContainerLeftWidth,
      navigationContainerRightWidth,
      wrapperWidth,
      titleTextWidth,
      onLayoutNavigationContainerLeft,
      onLayoutNavigationContainerRight,
      onLayoutWrapper,
      onLayoutTitleText,
    } = useOnLayout();

    const {
      titleAnimatedStyle,
      imageAnimatedStyle,
      penAnimatedStyle,
      textStyle,
      lettersAvatarStyle,
      iconAvatarStyle,
      verifiedStyle,
    } = useAnimatedStyles({
      animatedIndex,
      navigationContainerLeftWidth,
      navigationContainerRightWidth,
      wrapperWidth,
      titleTextWidth,
    });

    const {contactDetails} = useUserContactDetails({user});

    const {updateAvatar, updateAvatarLoading} = useUpdateAvatar();

    const {localImage, onEditPress} = useActionSheetUpdateAvatar({
      onChange: updateAvatar,
      uri,
    });

    useUpdateAvatarRouteParams(onEditPress);

    return (
      <View style={[topOffset.current, styles.outerContainer]}>
        <View style={styles.container}>
          <Text
            style={[
              styles.usernameText,
              styles.usernameTextMeasures,
              {
                marginLeft:
                  navigationContainerLeftWidth +
                  AVATAR_SMALL_SIZE +
                  TEXT_MARGIN_LEFT,
                marginRight: navigationContainerRightWidth,
              },
            ]}
            numberOfLines={1}
            onLayout={onLayoutTitleText}>
            {user ? buildUsernameWithPrefix(user.username) : ''}
          </Text>

          <View
            style={[styles.navigationContainer, styles.navigationContainerLeft]}
            onLayout={onLayoutNavigationContainerLeft}>
            <BackButton
              color={COLORS.primaryDark}
              containerStyle={styles.backButton}
            />
          </View>
          <View style={styles.wrapper} onLayout={onLayoutWrapper}>
            <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
              <View>
                <Animated.View
                  style={[imageAnimatedStyle, styles.imageContainer]}>
                  {isLoading && !uri ? (
                    <AvatarSkeleton />
                  ) : (
                    <>
                      {user ? (
                        <Avatar
                          uri={localImage?.path ?? uri}
                          style={styles.image}
                          size={AVATAR_SIZE}
                          borderRadius={AVATAR_RADIUS}
                          touchableStyle={commonStyles.flexOne}
                          allowFullScreen={true}
                        />
                      ) : (
                        <Image
                          source={NOT_FOUND}
                          resizeMode={'stretch'}
                          style={styles.image}
                        />
                      )}
                    </>
                  )}
                </Animated.View>
                {isOwner && (
                  <EditAvatarButton
                    onPress={onEditPress}
                    loading={updateAvatarLoading}
                    containerStyle={penAnimatedStyle}
                    iconStyle={iconAvatarStyle}
                  />
                )}
                {contactDetails && !isOwner && (
                  <ContactsAvatarButton
                    onPress={() => setIsTooltipVisible(state => !state)}
                    contacts={contactDetails}
                    containerStyle={lettersAvatarStyle}
                  />
                )}
              </View>
              {user && (
                <Animated.Text
                  style={[styles.usernameText, textStyle]}
                  numberOfLines={1}>
                  {buildUsernameWithPrefix(user.username)}
                </Animated.Text>
              )}
              {user && !!user.verified && (
                <Animated.View
                  ref={chevronRef}
                  style={[verifiedStyle, styles.chevron]}>
                  <TouchableWithoutFeedback onPress={showTooltip}>
                    <VerifiedSvg width={VERIFIED_SIZE} height={VERIFIED_SIZE} />
                  </TouchableWithoutFeedback>
                </Animated.View>
              )}
            </Animated.View>
          </View>
          <View
            style={[
              styles.navigationContainer,
              styles.navigationContainerRight,
            ]}
            onLayout={onLayoutNavigationContainerRight}>
            {isOwner && user?.hiddenProfileElements?.length ? (
              <ShowPrivacyButton containerStyle={styles.navigationButton} />
            ) : null}
            {isOwner && (
              <QRCodeShareButton containerStyle={styles.navigationButton} />
            )}
            {isOwner && <SettingsButton />}
          </View>
        </View>
        {contactDetails && isTooltipVisible && !isOwner && (
          <AgendaContactTooltip contact={contactDetails} />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  outerContainer: {
    zIndex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    width: windowWidth,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationContainerLeft: {
    paddingLeft: rem(16),
  },
  navigationContainerRight: {
    paddingRight: rem(16),
    paddingLeft: rem(12),
  },
  imageContainer: {
    borderColor: COLORS.foam,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  image: {
    width: undefined,
    height: undefined,
    borderRadius: 0,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  usernameText: {
    flexShrink: 1,
    ...font(17, 22, 'semibold', 'primaryDark'),
  },
  usernameTextMeasures: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
  backButton: {
    justifyContent: 'center',
    ...mirrorTransform(),
  },
  navigationButton: {
    marginRight: rem(16),
  },
  usernameContainer: {
    flexDirection: 'row',
    marginRight: rem(20),
  },
  badge: {
    marginTop: rem(1),
  },
  chevron: {
    marginTop: rem(4),
  },
});
