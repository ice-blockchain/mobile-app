// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
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
  actionLink: string;
  icon: React.ReactElement;
};

const data: DataType[] = [
  {
    topRightBackgroundImage: Images.creativeLibrary.carousel.iceBackground,
    backgroundColor: COLORS.primaryDark,
    title: t('creative_library.carousel.01.title'),
    description: t('creative_library.carousel.01.description'),
    actionText: t('creative_library.carousel.01.action'),
    actionLink:
      'https://drive.google.com/drive/u/1/folders/1E_3zVZzs2vqUNgUd05qfi6cJ_axjlvQU',
    icon: <Image source={Images.creativeLibrary.carousel.videosIcon} />,
  },
  {
    topRightBackgroundImage: Images.creativeLibrary.carousel.ellipseBackground,
    backgroundColor: COLORS.primaryLight,
    title: t('creative_library.carousel.02.title'),
    description: t('creative_library.carousel.02.description'),
    actionText: t('creative_library.carousel.02.action'),
    actionLink:
      'https://www.figma.com/community/file/1256148399031329897/ice-Community-Assets',
    icon: <Image source={Images.creativeLibrary.carousel.imagesIcon} />,
  },
  {
    topRightBackgroundImage: Images.creativeLibrary.carousel.iceBackground,
    backgroundColor: COLORS.primaryDark,
    title: t('creative_library.carousel.03.title'),
    description: t('creative_library.carousel.03.description'),
    actionText: t('creative_library.carousel.03.action'),
    actionLink:
      'https://github.com/ice-blockchain/community-assets/tree/master/website-widget',
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
        <Touchable
          style={styles.action}
          onPress={() => {
            openLinkWithInAppBrowser({url: item.actionLink});
          }}>
          <Text style={styles.actionText}>{item.actionText}</Text>
        </Touchable>
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
  },
  actionText: {
    ...font(12, 16, 'regular', 'shamrock'),
    textDecorationLine: 'underline',
  },
});
