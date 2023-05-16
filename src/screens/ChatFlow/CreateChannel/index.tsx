// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

import {CHANNEL_PHOTO_SIZE, ChannelPhoto} from './components/ChannelPhoto';

export const CreateChannel = () => {
  const safeAreaInsets = useSafeAreaInsets();

  const {scrollHandler, shadowStyle} = useScrollShadow();

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={'_Creating a channel'}
        containerStyle={shadowStyle}
        backgroundColor={COLORS.white}
      />

      <Animated.ScrollView
        style={commonStyles.flexOne}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            paddingBottom: safeAreaInsets.bottom + rem(16),
          },
        ]}
        keyboardShouldPersistTaps={'handled'}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <LinesBackground style={styles.headerBackground} />

          <ChannelPhoto />
        </View>

        <View style={styles.contentContainer}>
          <CommonInput label={'_Title'} value={title} onChangeText={setTitle} />

          <CommonInput
            containerStyle={styles.item}
            label={'_Description'}
            value={description}
            onChangeText={setDescription}
            multiline
            scrollEnabled={false}
          />

          <View style={commonStyles.flexOne} />

          <PrimaryButton style={styles.item} text={'_Create channel'} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const CONTAINER_BORDER_RADIUS = rem(30);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: rem(16),
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },

  headerContainer: {
    paddingBottom: rem(24) + CONTAINER_BORDER_RADIUS,
    alignItems: 'center',
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    top: CHANNEL_PHOTO_SIZE / 2,
    borderTopStartRadius: CONTAINER_BORDER_RADIUS,
    borderTopEndRadius: CONTAINER_BORDER_RADIUS,
    backgroundColor: 'blue',
  },

  contentContainer: {
    marginTop: -CONTAINER_BORDER_RADIUS,
    paddingTop: rem(24),
    paddingHorizontal: rem(16),
    flex: 1,
    borderTopStartRadius: CONTAINER_BORDER_RADIUS,
    borderTopEndRadius: CONTAINER_BORDER_RADIUS,
    backgroundColor: COLORS.white,
  },

  item: {
    marginTop: rem(24),
  },
});
