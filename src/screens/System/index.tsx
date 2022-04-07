// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import NetworkListener from './NetworkListener';
import AppStateListener from './AppStateListener';

/**
 * System layer, should be used for global listeners and overlays
 * @returns {JSX.Element}
 * @constructor
 */

export default function System() {
  return (
    <>
      <AppStateListener />
      <NetworkListener />
    </>
  );
}
