// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/Buttons/InviteButton';
import {FlipCard, FlipCardMethods} from '@components/FlipCard';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {DISTANCE_TO_OVERLAP} from '@screens/HomeFlow/Home/components/constants';
import {AdoptionCard} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard';
import {
  CARD_MARGIN_RIGHT_WIDTH,
  CARD_WIDTH,
  CARDS_COLLAPSED_HEIGHT,
  CARDS_TOTAL_HEIGHT,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {HeaderTopImage} from '@screens/HomeFlow/Home/components/Overview/components/HeaderTopImage';
import {LevelCard} from '@screens/HomeFlow/Home/components/Overview/components/LevelCard';
import {OnlineUsersHistory} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory';
import {ReferralAcquisitionHistory} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory';
import {ReferralsCard} from '@screens/HomeFlow/Home/components/Overview/components/ReferralsCard';
import {OVERSCROLL} from '@screens/HomeFlow/Home/components/Overview/constants';
import {useAdoptionCardWalkthrough} from '@screens/HomeFlow/Home/components/Overview/hooks/useAdoptionCardWalkthrough';
import {useCardTranslateY} from '@screens/HomeFlow/Home/components/Overview/hooks/useCardTranslateY';
import {useHandleActiveOverviewCardParam} from '@screens/HomeFlow/Home/components/Overview/hooks/useHandleActiveOverviewCardParam';
import {useInviteFriendsWalkthrough} from '@screens/HomeFlow/Home/components/Overview/hooks/useInviteFriendsWalkthrough';
import {useProfileCardWalkthrough} from '@screens/HomeFlow/Home/components/Overview/hooks/useProfileCardWalkthrough';
import {useReferralsCardWalkthrough} from '@screens/HomeFlow/Home/components/Overview/hooks/useReferralsCardWalkthrough';
import {useRtlLayoutReady} from '@screens/HomeFlow/Home/components/Overview/hooks/useRtlLayoutReady';
import {useScrollCollapse} from '@screens/HomeFlow/Home/components/Overview/hooks/useScrollCollapse';
import {t} from '@translations/i18n';
import React, {memo, useRef, useState} from 'react';
import {LayoutChangeEvent, Platform, StyleSheet, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {isAndroid, isIOS, rem} from 'rn-units';

type Props = {
  /**
   * onScroll -> contentOffset.y of the parent ScrollView
   */
  translateY: SharedValue<number>;

  /**
   * offset from the top of the parent ScrollView
   */
  topOffset: number;
};

const SCROLL_TOP_MARGIN = rem(16);
const SCROLL_BOTTOM_PADDING = rem(8);
const SCROLL_BOTTOM_MARGIN = rem(24);

export const Overview = memo(({translateY, topOffset}: Props) => {
  const adoptionFlipCardRef = useRef<FlipCardMethods>(null);
  const {scrollViewRef} = useHandleActiveOverviewCardParam();

  const {onProfileCardLayout, profileCardRef} = useProfileCardWalkthrough();
  const {onAdoptionCardLayout, adoptionCardRef} = useAdoptionCardWalkthrough();
  const {onReferralsCardLayout, referralsCardRef} =
    useReferralsCardWalkthrough();
  const {onInviteFriendsLayout, inviteFriendsRef} =
    useInviteFriendsWalkthrough();

  const [positionYInnerContent, setPositionYInnerContent] = useState(0);

  const {cardTranslateY, stickyAnimatedStyle} = useCardTranslateY({
    translateY,
    cardsTopOffset: topOffset + positionYInnerContent + SCROLL_TOP_MARGIN,
  });

  const {shadowStyle} = useScrollShadow({translateY: cardTranslateY});

  const {collapseAnimatedStyle, sharedIsCollapsed, isCollapsed} =
    useScrollCollapse({
      translateY: cardTranslateY,
      fromHeight: CARDS_TOTAL_HEIGHT + SCROLL_BOTTOM_PADDING,
      toHeight: CARDS_COLLAPSED_HEIGHT + SCROLL_BOTTOM_PADDING,
    });

  const handleAdoptionPress = () => {
    adoptionFlipCardRef.current?.changeSide();
  };

  const onLayoutContentContainer = (event: LayoutChangeEvent) => {
    setPositionYInnerContent(event.nativeEvent.layout.y);
  };

  const {onLayout} = useRtlLayoutReady({scrollViewRef});

  return (
    <>
      <HeaderTopImage />

      <View style={styles.sectionHeaderContainer}>
        <SectionHeader
          style={styles.sectionHeader}
          title={t('home.overview.title')}
        />
      </View>

      <Animated.View
        style={[styles.bodySpace, stickyAnimatedStyle, isIOS && shadowStyle]}
        pointerEvents={'box-none'}
        onLayout={onLayoutContentContainer}>
        <Animated.ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentInset={contentInset}
          style={[
            styles.scrollView,
            collapseAnimatedStyle,
            isAndroid && shadowStyle,
          ]}
          contentContainerStyle={styles.scrolledContent}>
          <LevelCard
            sharedIsCollapsed={sharedIsCollapsed}
            onLayout={() => {
              onLayout();
              onProfileCardLayout();
            }}
            ref={profileCardRef}
          />

          {isLightDesign ? null : (
            <View onLayout={onReferralsCardLayout} ref={referralsCardRef}>
              <FlipCard
                disabled={isCollapsed}
                stylesContainer={styles.flipCardContainer}
                front={<ReferralsCard sharedIsCollapsed={sharedIsCollapsed} />}
                back={
                  <ReferralAcquisitionHistory
                    sharedIsCollapsed={sharedIsCollapsed}
                  />
                }
              />
            </View>
          )}

          <View ref={adoptionCardRef} onLayout={onAdoptionCardLayout}>
            <FlipCard
              disabled={isCollapsed}
              stylesContainer={styles.flipCardContainer}
              front={
                <AdoptionCard
                  sharedIsCollapsed={sharedIsCollapsed}
                  onPress={isCollapsed ? undefined : handleAdoptionPress}
                />
              }
              back={
                <OnlineUsersHistory sharedIsCollapsed={sharedIsCollapsed} />
              }
              ref={adoptionFlipCardRef}
            />
          </View>
        </Animated.ScrollView>
      </Animated.View>

      {isLightDesign ? null : (
        <View ref={inviteFriendsRef} onLayout={onInviteFriendsLayout}>
          <InviteButton />
        </View>
      )}
    </>
  );
});

/**
 * used to make semi transparent overscroll background on iOS
 */
const contentInset = {left: -OVERSCROLL, top: 0, bottom: 0, right: -OVERSCROLL};

export const styles = StyleSheet.create({
  sectionHeaderContainer: {
    marginTop: -DISTANCE_TO_OVERLAP,
    backgroundColor: COLORS.white,
  },
  sectionHeader: {
    paddingTop: 0,
    height: -1,
  },
  bodySpace: {
    height: CARDS_TOTAL_HEIGHT + SCROLL_TOP_MARGIN + SCROLL_BOTTOM_MARGIN,
    zIndex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: SCROLL_TOP_MARGIN - DISTANCE_TO_OVERLAP * 2,
    left: 0,
    right: 0,
    ...Platform.select({
      android: {backgroundColor: COLORS.white},
    }),
  },
  scrolledContent: {
    paddingLeft: SCREEN_SIDE_OFFSET + OVERSCROLL,
    paddingRight: OVERSCROLL,
    backgroundColor: COLORS.white,
    ...Platform.select({
      android: {
        marginBottom: SCROLL_BOTTOM_PADDING,
      },
      ios: {paddingBottom: SCROLL_BOTTOM_PADDING},
    }),
  },
  flipCardContainer: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN_RIGHT_WIDTH,
    borderRadius: rem(20),
    overflow: 'hidden',
    flexGrow: 1,
  },
});
