// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {OAuthExtension} from '@magic-ext/react-native-oauth';
import {Magic} from '@magic-sdk/react-native';

export const magic = new Magic(ENV.MAGIC_LINK_KEY, {
  extensions: [new OAuthExtension()],
});
