// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SearchIconSvg} from '@svg/SearchIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {isIOS, rem} from 'rn-units';

type SearchProps = {
  value: string;
  style?: StyleProp<ViewStyle | FlexStyle>;
  placeholder?: string;
  onChangeText: (value: string) => void;
};

export function Search({
  style,
  placeholder = 'team.header.search_placeholder',
  ...rest
}: SearchProps): React.ReactElement {
  const textInputRef: React.RefObject<TextInput> = React.createRef();
  const focus = () => textInputRef.current?.focus();

  return (
    <View style={[styles.wrapper, style]}>
      <Touchable onPress={focus} style={styles.btn}>
        <SearchIconSvg />
      </Touchable>
      <TextInput
        ref={textInputRef}
        style={[styles.input]}
        placeholderTextColor={COLORS.heather}
        placeholder={placeholder ? t(placeholder) : ''}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rem(15),
    backgroundColor: COLORS.white,
    height: rem(45),
    alignSelf: 'center',
    marginTop: rem(55),
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: rem(isIOS ? 0 : 5),
    backgroundColor: 'transparent',
    fontSize: rem(13),
  },
  btn: {
    paddingLeft: rem(14),
    paddingRight: rem(14),
  },
});
