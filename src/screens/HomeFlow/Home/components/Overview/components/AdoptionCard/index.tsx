// SPDX-License-Identifier: ice License 1.0

import {AdoptionMilestone} from '@api/statistics/types';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  LEVEL_ROW_HEIGHT,
  LevelRow,
  STEP_WIDTH,
} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/components/LevelRow';
import {
  CARD_WIDTH,
  CardBaseSkeleton,
  CARDS_COLLAPSED_HEIGHT,
  CARDS_TOTAL_HEIGHT,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {adoptionSelector} from '@store/modules/Stats/selectors';
import {FriendsIcon} from '@svg/FriendsIcon';
import {GraphIcon} from '@svg/GraphIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Image,
  InteractionManager,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

const GRADIENT_START = {x: 0, y: 0.6};
const GRADIENT_END = {x: 0, y: 1};
const GRADIENT_COLORS = [
  COLORS.adoptionGradient,
  COLORS.adoptionGradient07,
  COLORS.adoptionGradient001,
];

type AdoptionCardProps = {
  isCollapsed: boolean;
  onPress: () => void;
};

const VERTICAL_ITEM_PADDING = CARDS_TOTAL_HEIGHT / 2 - LEVEL_ROW_HEIGHT / 2;

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

export const AdoptionCard = ({isCollapsed, onPress}: AdoptionCardProps) => {
  const adoption = useSelector(adoptionSelector);
  const isSplashHidden = useSelector(isSplashHiddenSelector);
  const refFlatList = useRef<Animated.FlatList<AdoptionMilestone> | null>(null);

  const sharedItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged: NonNullable<
    ViewabilityConfigCallbackPair['onViewableItemsChanged']
  > = useCallback(
    ({viewableItems}) => {
      // make copies of viewableItem.item to bypass reanimated error
      sharedItems.value = viewableItems.map(viewableItem => ({
        ...viewableItem,
        item: {...viewableItem.item},
      }));
    },
    [sharedItems],
  );

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [
      {
        viewabilityConfig,
        onViewableItemsChanged,
      },
    ],
  );

  const activeIndex = useMemo(() => {
    if (!adoption) {
      return 0;
    }

    const notAchievedIndex = adoption.milestones.findIndex(
      ({achievedAt}) => !achievedAt,
    );

    if (notAchievedIndex === -1) {
      return adoption.milestones.length - 1;
    }

    return notAchievedIndex - 1;
  }, [adoption]);

  const scrollToIndex = useCallback((index: number) => {
    //@ts-expect-error Bad types of Animated.FlatList, getNode() does not work
    refFlatList.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
  }, []);

  const onScrollToIndexFailed = useCallback(
    ({
      highestMeasuredFrameIndex,
    }: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      scrollToIndex(highestMeasuredFrameIndex);

      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          scrollToIndex(activeIndex);
        });
      }, 200);
    },
    [activeIndex, scrollToIndex],
  );

  useEffect(() => {
    if (activeIndex >= 0) {
      scrollToIndex(activeIndex);
    }
  }, [activeIndex, scrollToIndex]);

  const animatedStyleFlatList = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCollapsed ? 0 : 1, {
        duration: 200,
      }),
    };
  }, [isCollapsed]);

  const setRefFlatList = useCallback(
    (ref: Animated.FlatList<AdoptionMilestone> | null) => {
      refFlatList.current = ref;

      scrollToIndex(activeIndex);
    },
    [activeIndex, scrollToIndex],
  );

  const renderItem: ListRenderItem<AdoptionMilestone> = useCallback(
    ({item, index}) => {
      return (
        <LevelRow
          item={item}
          active={index === activeIndex}
          viewableItems={sharedItems}
          isTopSeparatorVisible={index !== 0}
          isBottomSeparatorVisible={
            index !== (adoption?.milestones ?? []).length - 1
          }
          onPress={isCollapsed ? undefined : onPress}
        />
      );
    },
    [activeIndex, sharedItems, adoption?.milestones, isCollapsed, onPress],
  );

  if (!isSplashHidden) {
    return null;
  }

  if (!adoption) {
    return <CardBaseSkeleton />;
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        source={Images.backgrounds.adoptionCardBg}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      />
      <View style={[styles.scrollAbsoluteContainer, styles.card]}>
        <Animated.FlatList
          ref={setRefFlatList}
          style={[styles.scrollContainer, animatedStyleFlatList]}
          contentContainerStyle={styles.scrollContentContainerStyle}
          data={adoption.milestones}
          renderItem={renderItem}
          keyExtractor={({milestone}) => milestone.toString()}
          snapToInterval={VERTICAL_ITEM_PADDING + rem(3.5)}
          snapToAlignment={'center'}
          showsVerticalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
      </View>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={[styles.gradient, styles.leftGradient]}
        pointerEvents={'none'}
      />
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={[styles.gradient, styles.rightGradient]}
        pointerEvents={'none'}
      />
      <View style={styles.header} pointerEvents={'none'}>
        <View style={styles.title}>
          <GraphIcon fill={COLORS.white} />
          <Text style={styles.titleText}>{t('home.adoption.title')}</Text>
        </View>
        <FriendsIcon fill={COLORS.white} />
        <Text style={styles.valueText}>
          {formatNumber(adoption?.totalActiveUsers ?? 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  scrollContentContainerStyle: {
    width: CARD_WIDTH,
    paddingTop: VERTICAL_ITEM_PADDING - rem(7),
    paddingBottom: rem(16),
  },
  gradient: {
    width: CARD_WIDTH / 2 - STEP_WIDTH / 2,
    height: rem(40),
    position: 'absolute',
    top: 0,
  },
  leftGradient: {
    left: 0,
  },
  rightGradient: {
    right: 0,
  },
  scrollAbsoluteContainer: {
    position: 'absolute',
  },
  card: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
    overflow: 'hidden',
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: rem(16),
    borderRadius: rem(20),
    paddingHorizontal: rem(15),
    overflow: 'hidden',
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CARDS_COLLAPSED_HEIGHT,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 16, 'black'),
  },
  valueText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 16, 'black'),
  },
});
