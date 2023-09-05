// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {CarouselSection} from '@screens/CreativeIceLibrary/components/CarouselSection';
import {GetStartedSection} from '@screens/CreativeIceLibrary/components/GetStartedSection';
import {PracticesSection} from '@screens/CreativeIceLibrary/components/PracticesSection';
import {PromoSection} from '@screens/CreativeIceLibrary/components/PromoSection';
import {SocialSection} from '@screens/CreativeIceLibrary/components/SocialSection';
import {ShareIcon} from '@svg/ShareIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export function CreativeIceLibrary() {
  useFocusStatusBar({style: 'dark-content'});
  const {scrollHandler, shadowStyle} = useScrollShadow();
  return (
    <View style={styles.container}>
      <Header
        color={COLORS.primaryDark}
        containerStyle={shadowStyle}
        title={t('creative_library.title')}
        backgroundColor={'transparent'}
        renderRightButtons={() => <ShareIcon color={COLORS.primaryDark} />}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <GetStartedSection />
        <CarouselSection />
        <SocialSection />
        <PromoSection />
        <PracticesSection />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
