// SPDX-License-Identifier: ice License 1.0

import {userSelector} from '@store/modules/Account/selectors';
import {useSelector} from 'react-redux';

export function useIsEnglishLocale() {
  const user = useSelector(userSelector);
  return user?.language === 'en';
}
