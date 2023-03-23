// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {useNewsBrowser} from '@screens/News/hooks/useNewsBrowser';
import {dayjs} from '@services/dayjs';
import {NewsSelectors} from '@store/modules/News/selectors';
import {ClockIcon} from '@svg/ClockIcon';
import {EyeIcon} from '@svg/EyeIcon';
import {NewsFeaturedNewBadge} from '@svg/NewsFeaturedNewBadge';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const FeaturedNewsArticle = memo(() => {
  const safeAreaInsets = useSafeAreaInsets();

  const featuredNewsArticle = useSelector(NewsSelectors.getFeaturedNewsArticle);

  const {openNewsArticle} = useNewsBrowser(featuredNewsArticle);

  if (!featuredNewsArticle) {
    return <FeaturedNewsArticleSkeleton />;
  }

  const {imageUrl, title, createdAt, views, viewed} = featuredNewsArticle;

  return (
    <View style={styles.container}>
      <Image
        style={StyleSheet.absoluteFill}
        source={{
          uri: imageUrl,
        }}
      />

      <LinearGradient
        style={[
          styles.topGradient,
          {
            height: safeAreaInsets.top,
          },
        ]}
        colors={[COLORS.black, COLORS.blackTransparent]}
      />

      <View style={styles.content}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[COLORS.blackTransparent, COLORS.black]}
        />

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.details}>
          {viewed ? null : (
            <NewsFeaturedNewBadge
              style={styles.newBadge}
              width={rem(28)}
              height={rem(18)}
            />
          )}

          <ClockIcon width={rem(16)} height={rem(16)} color={COLORS.white} />

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

          <Touchable
            hitSlop={SMALL_BUTTON_HIT_SLOP}
            style={styles.readMore}
            onPress={openNewsArticle}>
            <Text style={styles.readMoreText}>{t('news.read_more')}</Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
});

export const FeaturedNewsArticleSkeleton = () => (
  <View style={styles.container}>
    <LinearGradient
      style={StyleSheet.absoluteFill}
      colors={[COLORS.primaryLight, COLORS.toreaBay1]}
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
    height: rem(407),
    justifyContent: 'flex-end',
    backgroundColor: COLORS.white,
  },

  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  content: {
    paddingTop: rem(16),
    paddingHorizontal: rem(20),
    paddingBottom: rem(24 + 18),
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
  readMore: {
    paddingVertical: rem(6),
    paddingHorizontal: rem(16),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
  },
  readMoreText: {
    ...font(15, 18, 'semibold', 'primaryLight'),
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
