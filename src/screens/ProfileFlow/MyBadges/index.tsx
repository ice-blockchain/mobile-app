// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {BadgeList} from '@screens/ProfileFlow/MyBadges/components/BadgeList';
import {BADGES, CATEGORIES} from '@screens/ProfileFlow/MyBadges/mockData';
import {t} from '@translations/i18n';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

export const MyBadges = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const categoryBadges = BADGES[CATEGORIES[categoryIndex].key];

  const onCategoryChange = useCallback((index: number) => {
    setCategoryIndex(index);
  }, []);

  const renderHeader = useCallback(
    () => (
      <SegmentedControl
        segments={CATEGORIES}
        ref={switcherRef}
        style={styles.categorySwitcher}
        onChange={onCategoryChange}
      />
    ),
    [onCategoryChange],
  );

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.inviteButton}>
        <InviteButton />
      </View>
    );
  }, []);

  const onPanEnded = (event: HandlerStateChangeEvent) => {
    if (
      (event.nativeEvent as unknown as PanGestureHandlerEventPayload)
        .translationX > 0
    ) {
      if (categoryIndex > 0) {
        switcherRef.current?.changeSegment(categoryIndex - 1);
      }
    } else {
      if (categoryIndex < CATEGORIES.length - 1) {
        switcherRef.current?.changeSegment(categoryIndex + 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={t('my_badges.title')}
      />
      <PanGestureHandler activeOffsetX={[-70, 70]} onEnded={onPanEnded}>
        <View>
          <BadgeList
            data={categoryBadges}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={bottomOffset.current}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
          />
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySwitcher: {
    marginBottom: rem(12),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  inviteButton: {
    marginTop: rem(18),
  },
});
