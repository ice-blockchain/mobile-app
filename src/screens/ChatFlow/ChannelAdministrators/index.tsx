// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useSafeAreaFrame} from '@hooks/useSafeAreaFrame';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {userIdSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, ListRenderItem} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {AddAdministratorButton} from './components/AddAdministratorButton';
import {UserItem} from './components/UserItem';

export const ChannelAdministrators = () => {
  const {
    params: {channelId},
  } = useRoute<RouteProp<MainStackParamList, 'Chat/ChannelAdministrators'>>();

  const navigation = useNavigation();

  const safeAreaInsets = useSafeAreaInsets();

  const frame = useSafeAreaFrame();

  const [contentHeight, setContentHeight] = useState(0);

  const [headerHeight, setHeaderHeight] = useState(0);

  const curentUserId = useSelector(userIdSelector);

  const data = useMemo(() => [curentUserId, 'user1', 'user2'], [curentUserId]);

  const snapPoints = useMemo(() => {
    const snapPoint = contentHeight + headerHeight || 1;

    return [Math.min(snapPoint, frame.height + safeAreaInsets.bottom)];
  }, [contentHeight, frame.height, headerHeight, safeAreaInsets.bottom]);

  const onLayoutHeader = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }: LayoutChangeEvent) => {
      setHeaderHeight(height);
    },
    [],
  );

  const onContentSizeChange = useCallback((width: number, height: number) => {
    setContentHeight(height);
  }, []);

  const renderHeader = useCallback(() => {
    return <AddAdministratorButton channelId={channelId} />;
  }, [channelId]);

  const renderItem: ListRenderItem<typeof data[0]> = useCallback(
    ({item: userId}) => {
      return <UserItem style={styles.item} userId={userId} />;
    },
    [],
  );

  return (
    <View style={styles.background}>
      <Touchable style={StyleSheet.absoluteFill} onPress={navigation.goBack} />

      <BottomSheet
        snapPoints={snapPoints}
        handleComponent={null}
        handleHeight={0}
        animateOnMount
        enableOverDrag
        overDragResistanceFactor={10}
        backgroundStyle={commonStyles.baseSubScreen}
        activeOffsetY={[-5, 5]}>
        <View style={commonStyles.flexOne}>
          <View style={styles.titleContainer} onLayout={onLayoutHeader}>
            <Text style={styles.titleText}>
              {t('chat.channel_administrators.title')}
            </Text>
          </View>

          <BottomSheetFlatList
            style={commonStyles.flexOne}
            contentContainerStyle={{
              paddingBottom: safeAreaInsets.bottom + rem(16),
            }}
            onContentSizeChange={onContentSizeChange}
            ListHeaderComponent={renderHeader}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            overScrollMode={'never'}
            alwaysBounceVertical={false}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.transparentBackground,
  },

  titleContainer: {
    paddingTop: rem(27),
    paddingBottom: rem(20),
    paddingHorizontal: rem(16),
  },
  titleText: {
    ...font(14, 16.8, '600', 'primaryDark'),
    textTransform: 'uppercase',
    flexGrow: 1,
  },

  item: {
    marginTop: rem(16),
  },
});
