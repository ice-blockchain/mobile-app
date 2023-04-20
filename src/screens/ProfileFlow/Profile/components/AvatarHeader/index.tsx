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
import {AgendaContactTooltip} from '@screens/ProfileFlow/Profile/components/AvatarHeader/components/AgendaContactTooltip';
import {ContactsAvatarButton} from '@screens/ProfileFlow/Profile/components/AvatarHeader/components/ContactsAvatarButton';
import {EditAvatarButton} from '@screens/ProfileFlow/Profile/components/AvatarHeader/components/EditAvatarButton';
import {
  AVATAR_RADIUS,
  useAnimatedStyles,
} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useAnimatedStyles';
import {useUserContactDetails} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useUserContactDetails';
import {usernameWithPrefixSelector} from '@store/modules/Account/selectors';
import {font, mirrorTransform} from '@utils/styles';
import React, {memo, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

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
    const username = useSelector(usernameWithPrefixSelector);
    const topOffset = useTopOffsetStyle();

    const uri = user?.profilePictureUrl;

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const {
      imageAnimatedStyle,
      penAnimatedStyle,
      textStyle,
      lettersAvatarStyle,
      iconAvatarStyle,
    } = useAnimatedStyles({animatedIndex});

    const {contactDetails} = useUserContactDetails({user});

    const {updateAvatar, updateAvatarLoading} = useUpdateAvatar();

    const {localImage, onEditPress} = useActionSheetUpdateAvatar({
      onChange: updateAvatar,
      uri,
    });

    return (
      <View style={[topOffset.current, styles.outerContainer]}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
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
                        resizeMode="stretch"
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
              {contactDetails && (
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
                {username}
              </Animated.Text>
            )}
          </View>
          <View
            style={[
              styles.navigationContainer,
              styles.navigationContainerLeft,
            ]}>
            <BackButton
              color={COLORS.primaryDark}
              containerStyle={styles.backButton}
            />
          </View>
          <View
            style={[
              styles.navigationContainer,
              styles.navigationContainerRight,
            ]}>
            {isOwner && user?.hiddenProfileElements?.length && (
              <ShowPrivacyButton containerStyle={styles.navigationButton} />
            )}
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
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1000,
    width: windowWidth,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  navigationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: rem(16),
    top: 0,
    bottom: 0,
  },
  navigationContainerLeft: {
    left: rem(16),
  },
  navigationContainerRight: {
    right: rem(16),
  },
  imageContainer: {
    borderColor: COLORS.foam,
    overflow: 'hidden',
  },
  image: {
    width: undefined,
    height: undefined,
    borderRadius: 0,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  usernameText: {
    ...font(17, 20.4, 'semibold', 'primaryDark'),
  },
  backButton: {
    justifyContent: 'center',
    ...mirrorTransform(),
  },
  navigationButton: {
    marginRight: rem(16),
  },
});
