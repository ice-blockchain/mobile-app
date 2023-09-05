// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

const MIN_HEIGHT = rem(344);
const SPREAD_ITEM_HEIGHT_TO_SHARE_ITEM_HEIGHT_RATIO = 344 / 190;
function handleShareItemLinkPress(index: number) {
  switch (index) {
    case 1: {
      openLinkWithInAppBrowser({url: LINKS.KNOWLEDGE_BASE});
      break;
    }
    case 3: {
      openLinkWithInAppBrowser({url: LINKS.ICE_HOMEPAGE});
      break;
    }
    case 5: {
      openLinkWithInAppBrowser({url: LINKS.ICE_FAQ});
      break;
    }
  }
}

export function SocialSection() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const onBringYourFriendsPress = () => navigation.navigate('InviteShare');
  const [height, setHeight] = React.useState(MIN_HEIGHT);
  const onLayout = ({nativeEvent}: LayoutChangeEvent) =>
    setHeight(nativeEvent.layout.height);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View
        style={[styles.itemContainer, styles.shareItemContainer]}
        onLayout={onLayout}>
        <Text style={styles.titleText}>
          {t('creative_library.social_section.share.title')}
        </Text>
        <Text style={styles.descriptionText}>
          {replaceString(
            t('creative_library.social_section.share.description'),
            tagRegex('link', false),
            (match, index) => {
              return (
                <Text
                  key={match + index}
                  style={[styles.descriptionText, styles.link]}
                  onPress={() => handleShareItemLinkPress(index)}>
                  {match}
                </Text>
              );
            },
          )}
        </Text>
        <View style={styles.blogsImage}>
          <Image source={Images.creativeLibrary.socialSection.blogs} />
        </View>
      </View>
      <View style={{height}}>
        <View
          style={[
            styles.itemContainer,
            styles.spreadItemContainer,
            {
              height: height / SPREAD_ITEM_HEIGHT_TO_SHARE_ITEM_HEIGHT_RATIO,
            },
          ]}>
          <Text style={[styles.titleText, styles.whiteText]}>
            {t('creative_library.social_section.spread.title')}
          </Text>
          <Text style={[styles.descriptionText, styles.whiteText]}>
            {t('creative_library.social_section.spread.description')}
          </Text>
        </View>
        <Touchable
          style={[styles.itemContainer, styles.bringItemContainer]}
          onPress={onBringYourFriendsPress}>
          <Text style={styles.titleText}>
            {t('creative_library.social_section.bring.title')}
          </Text>
          <Text style={styles.descriptionText}>
            {t('creative_library.social_section.bring.description')}
          </Text>
          <View style={styles.shareProvidersImage}>
            <Image source={Images.share.shareProviders2} />
          </View>
        </Touchable>
      </View>
    </ScrollView>
  );
}

const GAP = rem(12);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.alabaster,
    paddingVertical: rem(30),
  },
  contentContainer: {
    paddingLeft: SCREEN_SIDE_OFFSET,
    paddingRight: SCREEN_SIDE_OFFSET - GAP,
  },
  itemContainer: {
    padding: rem(16),
    borderRadius: rem(16),
  },
  shareItemContainer: {
    width: rem(240),
    minHeight: MIN_HEIGHT,
    backgroundColor: COLORS.sunshineGold,
    marginRight: GAP,
  },
  spreadItemContainer: {
    width: MIN_HEIGHT,
    height: rem(190),
    backgroundColor: COLORS.socialLink,
    marginBottom: GAP,
  },
  bringItemContainer: {
    width: MIN_HEIGHT,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  titleText: {
    ...font(16, 22, 'bold', 'black'),
  },
  descriptionText: {
    paddingTop: rem(12),
    ...font(14, null, 'regular', 'black'),
  },
  link: {
    textDecorationLine: 'underline',
  },
  whiteText: {
    color: COLORS.white,
  },
  blogsImage: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: rem(20),
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
  shareProvidersImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: isRTL ? 'flex-end' : 'flex-start',
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
});
