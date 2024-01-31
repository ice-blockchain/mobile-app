// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ReadMoreButton} from '@screens/News/components/FeaturedNewsArticle/components/ReadMoreButton';
import {useReadMoreWalkthrough} from '@screens/News/components/FeaturedNewsArticle/hooks/useReadMoreWalkthrough';
import {useNewsBrowser} from '@screens/News/hooks/useNewsBrowser';
import {dayjs} from '@services/dayjs';
import {NewsSelectors} from '@store/modules/News/selectors';
import {ClockIcon} from '@svg/ClockIcon';
import {EyeIcon} from '@svg/EyeIcon';
import {NewsFeaturedNewBadge} from '@svg/NewsFeaturedNewBadge';
import {t} from '@translations/i18n';
import {getImageUriForSize} from '@utils/file';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {SharedValue} from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

import {useLayoutAnimation} from './hooks/useLayoutAnimation';

/**
 * Border radius of bottom sheet view
 */
export const FEATURED_HEADER_OVERLAP = rem(24);
export const FEATURED_HEADER_EXPANDED_HEIGHT =
  rem(374) + FEATURED_HEADER_OVERLAP;
export const FEATURED_HEADER_COLLAPSED_HEIGHT = rem(64);

interface Props {
  animatedIndex: SharedValue<number>;
  deltaPositions: number;
}

export const FeaturedNewsArticle = memo(
  ({animatedIndex, deltaPositions}: Props) => {
    const featuredNewsArticle = useSelector(
      NewsSelectors.getFeaturedNewsArticle,
    );

    const {openNewsArticle} = useNewsBrowser(featuredNewsArticle);

    const {
      titleStyle,
      contentStyle,
      valuesContainerStyle,
      onTitleLayout,
      onButtonLayout,
    } = useLayoutAnimation({
      animatedIndex,
      deltaPositions,
    });

    const {elementRef, onElementLayout} = useReadMoreWalkthrough({
      onPress: openNewsArticle,
    });

    if (!featuredNewsArticle) {
      return <FeaturedNewsArticleSkeleton />;
    }

    const {imageUrl, title, createdAt, views, viewed} = featuredNewsArticle;

    return (
      <Touchable style={styles.container} onPress={openNewsArticle}>
        <Image
          style={StyleSheet.absoluteFill}
          source={{
            uri: getImageUriForSize(imageUrl, {width: screenWidth}),
          }}
        />

        <Animated.View style={[styles.content, contentStyle]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={[
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0.35)',
              'rgba(0, 0, 0, 0.95)',
            ]}
          />

          <Animated.Text
            style={[styles.title, titleStyle]}
            numberOfLines={2}
            onLayout={onTitleLayout}>
            {title}
          </Animated.Text>

          <View style={styles.details}>
            <Animated.View
              style={[styles.valuesContainer, valuesContainerStyle]}>
              {viewed ? null : (
                <NewsFeaturedNewBadge
                  style={styles.newBadge}
                  width={rem(28)}
                  height={rem(18)}
                />
              )}

              <ClockIcon
                width={rem(16)}
                height={rem(16)}
                color={COLORS.white}
              />

              <Text style={styles.value} numberOfLines={1}>
                {dayjs(createdAt).isToday()
                  ? t('global.date.today')
                  : dayjs(createdAt).fromNow()}
              </Text>

              <EyeIcon width={rem(16)} height={rem(16)} fill={COLORS.white} />

              <Text style={styles.value} numberOfLines={1}>
                {t('news.views', {
                  viewsCount: formatNumber(views),
                })}
              </Text>
            </Animated.View>

            <View ref={elementRef} onLayout={onElementLayout}>
              <ReadMoreButton
                onButtonLayout={onButtonLayout}
                onPress={openNewsArticle}
              />
            </View>
          </View>
        </Animated.View>
      </Touchable>
    );
  },
);

export const FeaturedNewsArticleSkeleton = () => (
  <View style={styles.container}>
    <LinearGradient
      style={StyleSheet.absoluteFill}
      colors={[COLORS.primaryLight, COLORS.primaryDark]}
    />

    <SkeletonPlaceholder>
      <View style={styles.content}>
        <View style={styles.skeletonTitle1} />

        <View style={styles.skeletonTitle2} />

        <View style={styles.details}>
          <View style={styles.skeletonValue} />

          <View style={styles.skeletonButton} />
        </View>
      </View>
    </SkeletonPlaceholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: FEATURED_HEADER_EXPANDED_HEIGHT,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.white,
  },

  content: {
    paddingTop: rem(16),
    paddingHorizontal: rem(20),
    paddingBottom: rem(16) + FEATURED_HEADER_OVERLAP,
  },

  valuesContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  newBadge: {
    marginRight: rem(6),
  },

  title: {
    ...font(28, null, 'black', 'white'),
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: rem(8),
    marginBottom: rem(6),
  },
  value: {
    paddingHorizontal: rem(6),
    flex: 1,
    ...font(12, null, 'medium', 'white'),
  },

  skeletonTitle1: {
    marginRight: rem(55 - 20),
    marginBottom: rem(14),
    height: rem(21),
    borderRadius: rem(20),
    backgroundColor: COLORS.white,
  },
  skeletonTitle2: {
    marginRight: rem(20 + 104),
    marginBottom: rem(13 - 8),
    height: rem(21),
    borderRadius: rem(20),
    backgroundColor: COLORS.white,
  },
  skeletonValue: {
    marginRight: rem(20),
    flex: 1,
    height: rem(16),
    borderRadius: rem(20),
    backgroundColor: COLORS.white,
  },
  skeletonButton: {
    width: rem(104),
    height: rem(30),
    borderRadius: rem(20),
    backgroundColor: COLORS.white,
  },
});
