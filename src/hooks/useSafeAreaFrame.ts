// SPDX-License-Identifier: ice License 1.0

import {useNavigation} from '@react-navigation/native';
import {statusNoticeHeightSelector} from '@store/modules/StatusNotice/selectors';
// eslint-disable-next-line no-restricted-imports
import {useSafeAreaFrame as useSafeAreaFrameOriginal} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

export function useSafeAreaFrame(enforce?: boolean) {
  const statusNoticeHeight = useSelector(statusNoticeHeightSelector);
  const frame = useSafeAreaFrameOriginal();
  const navigation = useNavigation();
  const isRootLevelScreen = !navigation.getParent();

  const noticeHeight = isRootLevelScreen ? 0 : statusNoticeHeight;
  return {
    ...frame,
    height: enforce ? frame.height : frame.height - noticeHeight,
  };
}
