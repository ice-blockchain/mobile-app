// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type DataType = {
  image: ImageRequireSource;
  title: string;
  description: string;
  icon: React.ReactElement;
};

const data: DataType[] = [
  {
    image: Images.creativeLibrary.getStartedCarousel['01'],
    title: t('creative_library.get_started.carousel.01.title'),
    description: t('creative_library.get_started.carousel.01.description'),
    icon: <Image source={Images.creativeLibrary.getStartedCarousel.join} />,
  },
  {
    image: Images.creativeLibrary.getStartedCarousel['02'],
    title: t('creative_library.get_started.carousel.02.title'),
    description: t('creative_library.get_started.carousel.02.description'),
    icon: <Image source={Images.creativeLibrary.getStartedCarousel.invite} />,
  },
  {
    image: Images.creativeLibrary.getStartedCarousel['03'],
    title: t('creative_library.get_started.carousel.03.title'),
    description: t('creative_library.get_started.carousel.03.description'),
    icon: <Image source={Images.creativeLibrary.getStartedCarousel.earn} />,
  },
];

export function GetStartedCarousel() {
  const renderItem = useCallback(({item}: {item: DataType}) => {
    return (
      <View key={item.title} style={[styles.dimensions, styles.itemContainer]}>
        <Image source={item.image} style={[styles.dimensions, styles.image]} />
        {item.icon}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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
  dimensions: {
    width: rem(240),
    height: rem(300),
    borderRadius: rem(16),
  },
  itemContainer: {
    padding: rem(12),
    marginRight: GAP,
  },
  image: {
    position: 'absolute',
  },
  title: {
    paddingTop: rem(12),
    ...font(16, 20, 'bold', 'white'),
  },
  description: {
    paddingTop: rem(16),
    ...font(14, null, 'regular', 'white'),
  },
});
