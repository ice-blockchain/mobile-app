// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {t} from '@utils/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const MyRoles = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {scrollHandler, animatedStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        containerStyle={animatedStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={t('my_roles.title')}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}>
        <View style={{backgroundColor: 'red', height: 1000}} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
