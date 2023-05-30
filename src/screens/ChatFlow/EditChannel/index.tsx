// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput, CommonInputRef} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {LinesBackground} from '@components/LinesBackground';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AdminIcon} from '@svg/AdminIcon';
import {BinIcon} from '@svg/BinIcon';
import {SpeakerphoneIcon} from '@svg/SpeakerphoneIcon';
import {t} from '@translations/i18n';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

import {CHANNEL_PHOTO_SIZE, ChannelPhoto} from './components/ChannelPhoto';
import {ConfigRow} from './components/ConfigRow';

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList>;
  route: RouteProp<MainStackParamList, 'Chat/EditChannel'>;
}

export const EditChannel = ({navigation, route}: Props) => {
  const {channelId} = route.params;

  const safeAreaInsets = useSafeAreaInsets();

  const {scrollHandler, shadowStyle} = useScrollShadow();

  const refDescription = useRef<CommonInputRef>(null);

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [channelType, _setChannelType] = useState<'public' | 'private'>(
    'public',
  );

  const [admins, _setAdmins] = useState<string[]>(['currentUser']);

  const onDeleteChannel = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t('chat.edit_channel.dialogs.delete_channel.title'),
      message: t('chat.edit_channel.dialogs.delete_channel.message'),
      buttons: [
        {
          text: t('button.cancel'),
          preset: 'outlined',
        },
        {
          text: t('chat.edit_channel.dialogs.delete_channel.buttons.delete'),
          preset: 'destructive',
          onPress: () => {
            // TODO: Close all screens related to this channelId (if not null)
            navigation.goBack();
          },
        },
      ],
    });
  }, [navigation]);

  const renderDeleteChannelButton = useCallback(() => {
    if (!channelId) {
      return null;
    }

    return (
      <Touchable onPress={onDeleteChannel}>
        <BinIcon width={rem(24)} height={rem(24)} color={COLORS.attention} />
      </Touchable>
    );
  }, [channelId, onDeleteChannel]);

  return (
    <KeyboardAvoider>
      <Header
        color={COLORS.primaryDark}
        title={
          channelId
            ? t('chat.edit_channel.title_edit')
            : t('chat.edit_channel.title_create')
        }
        containerStyle={shadowStyle}
        backgroundColor={COLORS.white}
        renderRightButtons={renderDeleteChannelButton}
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
          <CommonInput
            label={t('chat.edit_channel.labels.title')}
            value={title}
            onChangeText={setTitle}
            returnKeyType={'next'}
            onEndEditing={() => refDescription.current?.focus()}
          />

          <CommonInput
            ref={refDescription}
            containerStyle={styles.item}
            label={t('chat.edit_channel.labels.description')}
            value={description}
            onChangeText={setDescription}
            multiline
            scrollEnabled={false}
          />

          <ConfigRow
            style={styles.item}
            Icon={SpeakerphoneIcon}
            title={t('chat.edit_channel.labels.channel_type')}
            value={t(`chat.channel.type.${channelType}`)}
            onPress={() => {
              navigation.navigate('Chat/ChannelType', {
                channelId: null,
              });
            }}
          />

          <ConfigRow
            style={styles.item}
            Icon={AdminIcon}
            title={t('chat.edit_channel.labels.administrators')}
            value={admins.length}
            onPress={() => {
              navigation.navigate('Chat/ChannelAdministrators', {
                channelId: null,
              });
            }}
          />

          <View style={commonStyles.flexOne} />

          <PrimaryButton
            style={styles.item}
            text={
              channelId
                ? t('chat.edit_channel.buttons.save_changes')
                : t('chat.edit_channel.buttons.create_channel')
            }
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </Animated.ScrollView>
    </KeyboardAvoider>
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
