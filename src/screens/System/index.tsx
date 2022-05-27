// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {NetworkListener} from './NetworkListener';
import {AppStateListener} from './AppStateListener';
import {AppStatusListener} from './AppStatusListener';

/**
 * System layer, should be used for global listeners and overlays
 * @returns {JSX.Element}
 * @constructor
 */

export function System() {
  return (
    <>
      <AppStateListener />
      <NetworkListener />
      <AppStatusListener />
    </>
  );
}
