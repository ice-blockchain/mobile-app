// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useNewsBrowser} from '@screens/News/hooks/useNewsBrowser';
import {dayjs} from '@services/dayjs';
import {NewsSelectors} from '@store/modules/News/selectors';
import {ClockIcon} from '@svg/ClockIcon';
import {EyeIcon} from '@svg/EyeIcon';
import {NewsNewBadge} from '@svg/NewsNewBadge';
import {t} from '@translations/i18n';
import {getImageUriForSize} from '@utils/file';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  newsArticleId: string;
};

const IMAGE_WIDTH = rem(80);

export const NewsArticle = memo(({newsArticleId}: Props) => {
  const newsArticle = useSelector(NewsSelectors.getNewsArticle(newsArticleId));

  const {title, imageUrl, views, createdAt, viewed} = newsArticle;

  const {openNewsArticle} = useNewsBrowser(newsArticle);

  return (
    <Touchable style={styles.container} onPress={openNewsArticle}>
      {viewed ? null : (
        <LinearGradient
          colors={[COLORS.koromiko, COLORS.neonCarrot]}
          style={styles.gradient}
        />
      )}

      <View style={styles.containerInner}>
        <Image
          style={styles.image}
          source={{
            uri: getImageUriForSize(imageUrl, {width: IMAGE_WIDTH}),
          }}
        />

        <View style={styles.containerInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <View style={styles.valuesContainer}>
            <View style={styles.valueContainer}>
              <ClockIcon
                width={rem(16)}
                height={rem(16)}
                color={COLORS.secondary}
              />

              <Text style={styles.valueText} numberOfLines={1}>
                {dayjs(createdAt).isToday()
                  ? t('global.date.today')
                  : dayjs(createdAt).fromNow()}
              </Text>
            </View>

            <View style={styles.valueContainer}>
              <EyeIcon
                width={rem(16)}
                height={rem(16)}
                fill={COLORS.secondary}
              />

              <Text style={styles.valueText} numberOfLines={1}>
                {t('news.views', {
                  viewsCount: formatNumber(views),
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {viewed ? null : <NewsNewBadge style={styles.newBadge} />}
    </Touchable>
  );
});

export const NewsArticleSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.containerSkeleton} />
  </SkeletonPlaceholder>
);

const BORDER_WIDTH = rem(1);
const BORDER_RADIUS = rem(16);
const CONTENT_PADDING = rem(12) - BORDER_WIDTH;

const styles = StyleSheet.create({
  container: {
    marginVertical: rem(9),
    marginHorizontal: rem(20),
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    ...commonStyles.shadow,
  },
  containerSkeleton: {
    marginVertical: rem(9),
    marginHorizontal: rem(20),
    height: rem(96),
    borderRadius: BORDER_RADIUS,
    ...commonStyles.shadow,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDER_RADIUS,
  },
  newBadge: {
    position: 'absolute',
    top: -rem(8),
    right: rem(12),
  },

  containerInner: {
    margin: BORDER_WIDTH,
    padding: CONTENT_PADDING,
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS - BORDER_WIDTH,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },

  image: {
    width: IMAGE_WIDTH,
    height: rem(72),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(16),
    marginRight: rem(14),
  },

  containerInfo: {
    marginVertical: rem(16) - CONTENT_PADDING,
    flex: 1,
    justifyContent: 'space-between',
  },

  title: {
    ...font(14, 19, 'semibold', 'primaryDark'),
  },

  valuesContainer: {
    flexDirection: 'row',
  },
  valueContainer: {
    marginRight: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexShrink: 1,
  },
  valueText: {
    marginLeft: rem(6),
    ...font(12, null, 'regular', 'secondary'),
  },
});
