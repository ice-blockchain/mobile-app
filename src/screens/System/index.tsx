// SPDX-License-Identifier: BUSL-1.1

import React from 'react';

import {AppStateListener} from './AppStateListener';
import {AppStatusListener} from './AppStatusListener';
import {NetworkListener} from './NetworkListener';

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
