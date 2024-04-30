// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Info} from '@screens/Team/components/Header/components/Info';
import {Search} from '@screens/Team/components/Header/components/Search';
import {CollectionActions} from '@store/modules/Collections';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import debounce from 'lodash/debounce';
import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
};

export const Header = memo(({isSearchActive, setIsSearchActive}: Props) => {
  const dispatch = useDispatch();

  const search = useMemo(
    () =>
      debounce((query: string) => {
        if (query) {
          dispatch(
            CollectionActions.SEARCH_USERS.START.create({
              query,
              isInitial: true,
            }),
          );
        } else {
          dispatch(CollectionActions.SEARCH_USERS.CLEAR.create());
        }
      }, 600),
    [dispatch],
  );

  const loading = useSelector(
    isLoadingSelector.bind(null, CollectionActions.SEARCH_USERS),
  );

  const onFocus = () => {
    setIsSearchActive(true);
  };

  const onClosePress = () => {
    setIsSearchActive(false);
    dispatch(CollectionActions.SEARCH_USERS.CLEAR.create());
  };

  return (
    <View style={styles.container}>
      <Search
        isActive={isSearchActive}
        loading={loading}
        onChangeText={search}
        onClosePress={onClosePress}
        onFocus={onFocus}
      />
      {isLightDesign ? null : <Info />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
});
