// SPDX-License-Identifier: ice License 1.0

import {BackButton} from '@components/Buttons/BackButton';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {COLORS} from '@constants/colors';
import {smallHeightDevice, windowWidth} from '@constants/styles';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {useScrollOpacity} from '@hooks/useScrollOpacity';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Background} from '@screens/Templates/FinalizeRegistrationStep/components/Background';
import React, {ReactNode} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

type Props = {
  title: string;
  header: ReactNode;
  imageSource: ImageSourcePropType;
  button: ReactNode;
  input?: ReactNode;
  info?: ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
};

export const FinalizeRegistrationStep = ({
  title,
  header,
  imageSource,
  input,
  button,
  info,
  showBackButton = false,
  onBackPress = () => {},
}: Props) => {
  useFocusStatusBar({style: 'light-content'});

  const {scrollRef} = useScrollEndOnKeyboardShown();
  const {animatedOpacityStyle, scrollHandler} = useScrollOpacity();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Background />
        <View style={styles.headerContainer}>
          <Header
            color={COLORS.white}
            title={title}
            backgroundColor={COLORS.primaryLight}
            containerStyle={animatedOpacityStyle}
            showBackButton={showBackButton}
          />
        </View>
        <KeyboardAvoider>
          <Animated.ScrollView
            contentContainerStyle={styles.scrollViewContent}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            keyboardShouldPersistTaps={'handled'}
            ref={scrollRef}
            bounces={false}>
            {header}
            <Image
              source={imageSource}
              style={styles.illustration}
              resizeMode={'cover'}
            />
            <View style={styles.controls}>
              {input && <View style={styles.inputContainer}>{input}</View>}
              {info}
              <View style={styles.buttonContainer}>{button}</View>
            </View>
          </Animated.ScrollView>
        </KeyboardAvoider>
      </SafeAreaView>
      {showBackButton && <BackButton onPress={onBackPress} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  illustration: {
    width: windowWidth,
    height: (windowWidth * 250) / 375,
  },
  controls: {
    backgroundColor: COLORS.white,
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  inputContainer: {
    marginTop: rem(16),
    marginHorizontal: rem(16),
  },
  buttonContainer: {
    marginTop: smallHeightDevice ? rem(8) : rem(20),
    marginBottom: rem(26),
    marginHorizontal: rem(48),
  },
});
