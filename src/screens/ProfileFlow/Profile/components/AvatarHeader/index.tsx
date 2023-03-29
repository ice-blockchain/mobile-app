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
import {AnimatedCameraIcon} from '@svg/AnimatedCameraIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated, {
  AnimatedStyleProp,
  Extrapolate,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem, screenWidth} from 'rn-units';

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const NOT_FOUND = require('../../assets/images/notFoundPlaceholder.png');

export const AVATAR_SIZE = rem(122);
const AVATAR_SMALL_SIZE = rem(36);
const AVATAR_SMALL_RADIUS = rem(16);
const AVATAR_RADIUS = rem(41);
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

const MAX_SCROLL = 160;
const SCROLL_STEP_1 = 140;
const PEN_SIZE = rem(32);
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

    const imageSize = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [0, MAX_SCROLL],
        [AVATAR_SIZE, AVATAR_SMALL_SIZE],
        Extrapolate.CLAMP,
      ),
    );

    const penSize = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [0, MAX_SCROLL / 2],
        [PEN_SIZE, 0],
        Extrapolate.CLAMP,
      ),
    );

    const marginTop = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [0, MAX_SCROLL],
        [AVATAR_SIZE / 2 + HEADER_HEIGHT / 2 + 8, 0],
        Extrapolate.CLAMP,
      ),
    );

    const borderWidth = useDerivedValue(() =>
      interpolate(scrollY.value, [0, MAX_SCROLL], [5, 0], Extrapolate.CLAMP),
    );

    const borderRadius = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [0, MAX_SCROLL],
        [AVATAR_RADIUS, AVATAR_SMALL_RADIUS],
        Extrapolate.CLAMP,
      ),
    );

    const imageAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: imageSize.value,
        width: imageSize.value,
        borderWidth: borderWidth.value,
        borderRadius: borderRadius.value,
        marginTop: marginTop.value,
      };
    });

    const penOpacity = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [0, MAX_SCROLL / 2],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    );

    const penAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: penSize.value,
        width: penSize.value,
        opacity: penOpacity.value,
      };
    });

    const textOpacity = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [130, SCROLL_STEP_1],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    );

    const lettersAvatarOpacity = useDerivedValue(() =>
      interpolate(scrollY.value, [0, 5], [1, 0], Extrapolate.CLAMP),
    );

    const fontSize = useDerivedValue(() =>
      interpolate(
        scrollY.value,
        [0, SCROLL_STEP_1],
        [0.01, 17],
        Extrapolate.CLAMP,
      ),
    );

    const marginLeft = useDerivedValue(() =>
      interpolate(scrollY.value, [0, MAX_SCROLL], [0, 12], Extrapolate.CLAMP),
    );

    const textStyle = useAnimatedStyle(() => ({
      opacity: textOpacity.value,
      fontSize: fontSize.value,
      marginLeft: marginLeft.value,
    }));

    const extraPadding = {
      paddingTop: topInset,
      height: HEADER_HEIGHT + topInset,
    };

    const lettersAvatarStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
      () => ({
        opacity: lettersAvatarOpacity.value,
      }),
    );

    const {updateAvatar, updateAvatarLoading} = useUpdateAvatar();

    const {localImage, onEditPress} = useActionSheetUpdateAvatar({
      onChange: updateAvatar,
      uri,
    });

    const iconAnimatedColor = useDerivedValue(() =>
      interpolateColor(
        scrollY.value,
        [0, MAX_SCROLL],
        [COLORS.primaryDark, COLORS.alabaster],
      ),
    );

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
                  <AnimatedCameraIcon animatedColor={iconAnimatedColor} />
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
