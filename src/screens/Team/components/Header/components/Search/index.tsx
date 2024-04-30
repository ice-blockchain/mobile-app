// SPDX-License-Identifier: ice License 1.0

import {SEARCH_INPUT_HEIGHT, SearchInput} from '@components/Inputs/SearchInput';
import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {useSearchAnimation} from '@screens/Team/components/Header/components/Search/hooks/useSearchAnimation';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SEARCH_INPUT_TOP_OFFSET = rem(13);
export const SEARCH_HEIGHT = SEARCH_INPUT_HEIGHT + SEARCH_INPUT_TOP_OFFSET;

const CANCEL_WIDTH = rem(70);

type SearchProps = {
  isActive: boolean;
  loading: boolean;
  onClosePress: () => void;
} & TextInputProps;

export const Search = ({
  isActive,
  loading,
  onClosePress,
  ...textInputProps
}: SearchProps) => {
  const textInputRef: React.RefObject<TextInput> = React.createRef();

  const topOffset = useTopOffsetStyle();
  const {animatedContainerStyle, animatedCancelStyle} = useSearchAnimation({
    isActive,
    cancelWidth: CANCEL_WIDTH,
  });

  const closeSearch = () => {
    textInputRef.current?.clear();
    Keyboard.dismiss();
    onClosePress();
  };

  const handleSubmit = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (event.nativeEvent.text.trim() === '') {
      closeSearch();
    }
  };

  return (
    <View style={topOffset.current}>
      <Animated.View style={[styles.cancelButtonWrapper, animatedCancelStyle]}>
        <Touchable
          onPress={closeSearch}
          hitSlop={MIDDLE_BUTTON_HIT_SLOP}
          activeOpacity={1}>
          <Text style={styles.cancelText}>{t('button.cancel')}</Text>
        </Touchable>
      </Animated.View>
      <Animated.View style={[animatedContainerStyle, styles.container]}>
        <SearchInput
          loading={loading}
          ref={textInputRef}
          placeholder={t('team.header.search_placeholder')}
          onSubmitEditing={handleSubmit}
          {...textInputProps}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SEARCH_INPUT_TOP_OFFSET,
  },
  cancelButtonWrapper: {
    position: 'absolute',
    right: -rem(7),
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: CANCEL_WIDTH,
    height: SEARCH_HEIGHT - SEARCH_INPUT_TOP_OFFSET,
  },
  cancelText: {
    ...font(rem(16), null, 'bold', 'white', 'center'),
  },
});
