// SPDX-License-Identifier: BUSL-1.1

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

export function AppStatusListener() {
  const [ready, setReady] = useState(false);

  const onAppDidOpen = async () => {
    await RNBootSplash.hide({fade: true});
    setReady(true);
  };

  const onAppWillClose = async () => {
    // handle application closed
  };

  React.useEffect(() => {
    onAppDidOpen();
    return () => {
      onAppWillClose();
    };
  }, []);

  if (!ready) {
    return <View style={styles.overlay} />;
  }

  return null;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});
