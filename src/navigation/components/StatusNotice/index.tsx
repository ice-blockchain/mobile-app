// SPDX-License-Identifier: ice License 1.0

import {ParsedDescription} from '@components/ParsedDescription';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useNewsBrowser} from '@screens/News/hooks/useNewsBrowser';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {StatusNoticeActions} from '@store/modules/StatusNotice/actions';
import {statusNoticeDataSelector} from '@store/modules/StatusNotice/selectors';
import {MaintenanceIcon} from '@svg/MaintenanceIcon';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units/index';

export function StatusNotice() {
  const statusNoticeData = useSelector(statusNoticeDataSelector);

  const {top: topInset} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const language = useSelector(appLocaleSelector);

  const newsArticleData = React.useMemo(() => {
    const {newsData} = statusNoticeData ?? {};
    if (!newsData) {
      return undefined;
    }
    return {
      id: newsData.id,
      url: newsData.url,
      viewed: false,
      language,
    };
  }, [language, statusNoticeData]);

  const {openNewsArticle} = useNewsBrowser(newsArticleData);
  if (!statusNoticeData) {
    return null;
  }

  const {link, data, gradientColors, newsData, icon} = statusNoticeData;

  return (
    <Touchable
      onPress={() => {
        if (newsArticleData) {
          openNewsArticle();
        } else if (link) {
          openLinkWithInAppBrowser({url: link});
        }
      }}>
      <LinearGradient
        colors={[
          gradientColors?.[0] ?? COLORS.koromiko,
          gradientColors?.[1] ?? COLORS.neonCarrot,
        ]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[0.24, 0.9562]}
        style={[styles.container, {paddingTop: topInset}]}
        onLayout={(event: LayoutChangeEvent) =>
          dispatch(
            StatusNoticeActions.SET_STATUS_NOTICE_HEIGHT.STATE.create(
              event.nativeEvent.layout.height,
            ),
          )
        }>
        <View style={styles.titleContainer}>
          <View style={styles.icon}>
            {icon ? (
              <Image
                source={{
                  uri: icon,
                }}
                style={styles.image}
              />
            ) : (
              <MaintenanceIcon color={COLORS.white} />
            )}
          </View>
          <Text style={styles.titleText}>{newsData?.title ?? data?.title}</Text>
        </View>
        {!newsData && data?.content ? (
          <Text style={styles.contentText}>
            <ParsedDescription description={data?.content} link={link} />
          </Text>
        ) : null}
      </LinearGradient>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: rem(18),
    paddingTop: rem(20),
    paddingBottom: rem(12),
  },
  image: {
    width: rem(16),
    height: rem(16),
  },
  icon: {
    paddingRight: rem(8),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    ...font(15, 18, 'semibold', 'white'),
  },
  contentText: {
    marginTop: rem(8),
    ...font(13, 18, 'regular', 'white'),
  },
});
