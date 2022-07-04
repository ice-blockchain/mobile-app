// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import Clipboard from '@react-native-clipboard/clipboard';
import {t} from '@translations/i18n';
import React, {Component} from 'react';
import {Animated, StyleSheet, Text, Vibration, View} from 'react-native';
import {font, rem, wait} from 'rn-units';

export default class Copied extends Component {
  state = {
    inProgress: false,
    slideUpValue: new Animated.Value(0),
  };

  updateVisibleState = (isVisible: boolean) => {
    const {inProgress} = this.state;
    if (!inProgress) {
      this.setState({inProgress: true}, () => {
        Animated.timing(this.state.slideUpValue, {
          toValue: isVisible ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
          delay: isVisible ? 200 : 0,
        }).start(async () => {
          this.setState({inProgress: false});
          if (isVisible) {
            Clipboard.setString(t('invite_share.share_full_text'));
            Vibration.vibrate([0, 50]);
            await wait(2000);
            this.updateVisibleState(false);
          }
        });
      });
    }
  };

  render() {
    let {slideUpValue} = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.copiedContainer,
            {
              transform: [
                {
                  translateY: slideUpValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [rem(50), 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.text}>{t('invite_share.copied')}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  copiedContainer: {
    height: rem(38),
    width: rem(92),
    borderRadius: 11,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: font(14),
    color: COLORS.gulfBlue,
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
  },
});
