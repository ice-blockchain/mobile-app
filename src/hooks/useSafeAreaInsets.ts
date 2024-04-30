// SPDX-License-Identifier: ice License 1.0

import {useNavigation} from '@react-navigation/native';
import {statusNoticeDataSelector} from '@store/modules/StatusNotice/selectors';
// eslint-disable-next-line no-restricted-imports
import {useSafeAreaInsets as useSafeAreaInsetsOriginal} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

export function useSafeAreaInsets() {
  const statusNoticeData = useSelector(statusNoticeDataSelector);
  const navigation = useNavigation();
  const isRootLevelScreen = !navigation.getParent();
  const insets = useSafeAreaInsetsOriginal();

  const resetTopInset = statusNoticeData && !isRootLevelScreen;

  return {...insets, top: resetTopInset ? 0 : insets.top};
}
