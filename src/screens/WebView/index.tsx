// SPDX-License-Identifier: BUSL-1.1

// import RNWebView from 'react-native-webview';
// import {navigation} from '@navigation/index';
import React from 'react';
import {StyleSheet, View} from 'react-native';
// import BackButton from 'src/components/BackButton';

export function WebView() {
  // const {url} = navigation.getParams();
  return (
    <View style={styles.wrapper}>
      {/* <RNWebView source={{uri: url}} style={styles.container} /> */}
      {/* <BackButton style={styles.back} onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
