// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {Avatar, AvatarSkeleton} from '@components/Avatar/Avatar';
import {ContactAvatar} from '@components/ContactAvatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useActionSheetUpdateAvatar} from '@hooks/useActionSheetUpdateAvatar';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {useUpdateAvatar} from '@hooks/useUpdateAvatar';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import {SettingsButton} from '@navigation/components/Header/components/SettingsButton';
import {ShowPrivacyButton} from '@navigation/components/Header/components/ShowPrivacyButton';
import {
  AVATAR_RADIUS,
  PEN_SIZE,
  useAnimatedStyles,
} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useAnimatedStyles';
import {AnimatedCameraIcon} from '@svg/AnimatedCameraIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem, screenWidth} from 'rn-units';

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const NOT_FOUND = require('../../assets/images/notFoundPlaceholder.png');

export const AVATAR_SIZE = rem(122);

const MIN_WIDTH_SIDE_CONTAINERS = rem(80);
const MIN_WIDTH_SMALL_SIDE_CONTAINERS = rem(40);

type Props = {
  user?: User | null;
  uri?: string;
  scrollY: SharedValue<number>;
  isOwner: boolean;
  isLoading?: boolean;
  contact: Contact | undefined;
  onContactPress: () => void;
};

export const AvatarHeader = memo(
  ({
    user,
    uri,
    scrollY,
    isOwner,
    isLoading = false,
    contact,
    onContactPress,
  }: Props) => {
    const {shadowStyle} = useScrollShadow({translateY: scrollY});
    const {top: topInset} = useSafeAreaInsets();

    const {
      imageAnimatedStyle,
      penAnimatedStyle,
      textStyle,
      lettersAvatarStyle,
      iconAvatarStyle,
    } = useAnimatedStyles({scrollY});

    const extraPadding = {
      paddingTop: topInset,
      height: HEADER_HEIGHT + topInset,
    };

    const {updateAvatar, updateAvatarLoading} = useUpdateAvatar();

    const {localImage, onEditPress} = useActionSheetUpdateAvatar({
      onChange: updateAvatar,
      uri,
    });

    return (
      <Animated.View style={[styles.container, extraPadding, shadowStyle]}>
        <View
          style={[
            styles.leftContainer,
            !user?.hiddenProfileElements?.length && styles.leftSmallContainer,
          ]}>
          <BackButton
            containerStyle={styles.backButton}
            color={COLORS.primaryDark}
          />
        </View>
        <View style={styles.wrapper}>
          <View>
            <Animated.View style={[imageAnimatedStyle, styles.imageContainer]}>
              {isLoading ? (
                <AvatarSkeleton />
              ) : (
                <>
                  {user ? (
                    <Avatar
                      uri={localImage?.path ?? uri}
                      style={styles.image}
                      size={AVATAR_SIZE}
                      borderRadius={AVATAR_RADIUS}
                      touchableStyle={styles.touchableAvatar}
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
              <AnimatedTouchable
                style={[penAnimatedStyle, styles.penWrapper]}
                onPress={onEditPress}
                disabled={updateAvatarLoading}
                hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
                {updateAvatarLoading ? (
                  <ActivityIndicator style={StyleSheet.absoluteFill} />
                ) : (
                  <AnimatedCameraIcon style={iconAvatarStyle} />
                )}
              </AnimatedTouchable>
            )}
          </View>
          {contact && (
            <AnimatedTouchable
              style={[styles.miniAvatarContainer, lettersAvatarStyle]}
              onPress={onContactPress}>
              <Animated.View style={[styles.lettersAvatar, lettersAvatarStyle]}>
                <ContactAvatar
                  sideSize={rem(30)}
                  borderRadius={rem(10)}
                  textStyle={styles.avatarText}
                  contact={contact}
                />
              </Animated.View>
            </AnimatedTouchable>
          )}
          {user && (
            <Animated.Text
              style={[styles.usernameText, textStyle]}
              numberOfLines={1}>
              {`@${user?.username}`}
            </Animated.Text>
          )}
        </View>
        <View
          style={[
            styles.rightContainer,
            !user?.hiddenProfileElements?.length && styles.rightSmallContainer,
          ]}>
          {isOwner && user && user?.hiddenProfileElements?.length && (
            <ShowPrivacyButton containerStyle={styles.showPrivacyButton} />
          )}
          {isOwner && user && <SettingsButton />}
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    flexDirection: 'row',
    width: screenWidth,
    overflow: 'visible',
    backgroundColor: COLORS.white,
    zIndex: 1000,
    ...commonStyles.shadow,
  },
  miniAvatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rightContainer: {
    paddingRight: rem(16),
    alignSelf: 'center',
    minWidth: MIN_WIDTH_SIDE_CONTAINERS,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSmallContainer: {
    minWidth: MIN_WIDTH_SMALL_SIDE_CONTAINERS,
  },
  leftContainer: {
    paddingLeft: rem(16),
    alignSelf: 'center',
    minWidth: MIN_WIDTH_SIDE_CONTAINERS,
  },
  leftSmallContainer: {
    minWidth: MIN_WIDTH_SMALL_SIDE_CONTAINERS,
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
  },
  touchableAvatar: {
    flex: 1,
  },
  avatarText: {
    ...font(13, 16, 'regular'),
  },
  lettersAvatar: {
    width: rem(30),
    height: rem(30),
    bottom: -rem(3),
    right: -rem(3),
    position: 'absolute',
  },
  penWrapper: {
    position: 'absolute',
    bottom: -rem(10),
    right: -rem(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: PEN_SIZE,
    height: PEN_SIZE,
    borderRadius: PEN_SIZE / 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    marginHorizontal: rem(10),
    marginVertical: rem(10),
  },
  showPrivacyButton: {marginRight: rem(16)},
});
