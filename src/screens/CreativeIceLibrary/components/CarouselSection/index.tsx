// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type DataType = {
  topRightBackgroundImage: ImageRequireSource;
  backgroundColor: string;
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactElement;
};

const data: DataType[] = [
  {
    topRightBackgroundImage: Images.creativeLibrary.carousel.iceBackground,
    backgroundColor: COLORS.primaryDark,
    title: t('creative_library.carousel.01.title'),
    description: t('creative_library.carousel.01.description'),
    actionText: t('creative_library.carousel.01.action'),
    icon: <Image source={Images.creativeLibrary.carousel.videosIcon} />,
  },
  {
    topRightBackgroundImage: Images.creativeLibrary.carousel.ellipseBackground,
    backgroundColor: COLORS.primaryLight,
    title: t('creative_library.carousel.02.title'),
    description: t('creative_library.carousel.02.description'),
    actionText: t('creative_library.carousel.02.action'),
    icon: <Image source={Images.creativeLibrary.carousel.imagesIcon} />,
  },
  {
    topRightBackgroundImage: Images.creativeLibrary.carousel.iceBackground,
    backgroundColor: COLORS.primaryDark,
    title: t('creative_library.carousel.03.title'),
    description: t('creative_library.carousel.03.description'),
    actionText: t('creative_library.carousel.03.action'),
    icon: <Image source={Images.creativeLibrary.carousel.videosIcon} />,
  },
];

export function CarouselSection() {
  const renderItem = useCallback(({item}: {item: DataType}) => {
    return (
      <View
        key={item.title}
        style={[styles.itemContainer, {backgroundColor: item.backgroundColor}]}>
        <Image
          source={item.topRightBackgroundImage}
          style={styles.topRightBackgroundImage}
        />
        {item.icon}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.action}>{item.actionText}</Text>
      </View>
    );
  }, []);
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
}

const GAP = rem(12);

const styles = StyleSheet.create({
  container: {
    paddingVertical: rem(30),
  },
  contentContainer: {
    paddingLeft: SCREEN_SIDE_OFFSET,
    paddingRight: SCREEN_SIDE_OFFSET - GAP,
  },
  topRightBackgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: rem(16),
  },
  itemContainer: {
    padding: rem(12),
    borderRadius: rem(16),
    width: rem(260),
    marginRight: GAP,
  },
  title: {
    paddingTop: rem(8),
    ...font(16, 20, 'bold', 'white'),
  },
  description: {
    paddingTop: rem(14),
    ...font(12, 16, 'regular', 'white'),
  },
  action: {
    paddingTop: rem(14),
    ...font(12, 16, 'regular', 'shamrock'),
    textDecorationLine: 'underline',
  },
});
