// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ENV} from '@constants/env';
import {MainStackParamList} from '@navigation/Main';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ContextMenuAction} from '@screens/ChatFlow/Channel/components/ChannelPostHighlight/components/ContextMenuAction';
import {CopyIcon} from '@svg/CopyIcon';
import {CopyLinkIcon} from '@svg/CopyLinkIcon';
import {DeleteIcon} from '@svg/DeleteIcon';
import {ReplyToIcon} from '@svg/ReplyToIcon';
import {ReportIcon} from '@svg/ReportIcon';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {SelectIcon} from '@svg/SelectIcon';
import {WriteMessageIcon} from '@svg/WriteMessageIcon';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function ContextMenu({postData}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  return (
    <View>
      <RoundedTriangle
        width={rem(18)}
        height={rem(16)}
        fill={COLORS.white}
        style={styles.triangleContainer}
      />
      <View style={styles.container}>
        <ContextMenuAction
          title={'Reply'}
          icon={<ReplyToIcon color={COLORS.primaryDark} />}
          action={() => {}}
        />
        <View style={styles.delimeter} />
        <ContextMenuAction
          title={'Edit'}
          icon={
            <WriteMessageIcon
              width={rem(18)}
              height={rem(18)}
              strokeWidth={1.5}
              color={COLORS.primaryDark}
            />
          }
          action={() => {}}
        />
        <View style={styles.delimeter} />
        <ContextMenuAction
          title={'Copy text'}
          icon={
            <CopyIcon
              width={rem(22)}
              height={rem(22)}
              color={COLORS.primaryDark}
            />
          }
          action={() => {
            Clipboard.setString(
              postData.postText ??
                postData.postCaption ??
                postData.postEmoji ??
                postData.postLink?.shortDescription ??
                postData.postFile?.fileName ??
                '',
            );
            navigation.goBack();
          }}
        />
        <View style={styles.delimeter} />
        <ContextMenuAction
          title={'Copy link'}
          icon={<CopyLinkIcon color={COLORS.primaryDark} />}
          action={() => {
            Clipboard.setString(
              `${ENV.DEEPLINK_SCHEME}://post?id=${postData.id}`,
            );
            navigation.goBack();
          }}
        />
        <View style={styles.delimeter} />
        <ContextMenuAction
          title={'Report'}
          icon={<ReportIcon color={COLORS.primaryDark} />}
          action={() => {}}
        />
        <View style={styles.delimeter} />
        <ContextMenuAction
          title={'Select'}
          icon={<SelectIcon color={COLORS.primaryDark} />}
          action={() => {}}
        />
        <View style={styles.delimeter} />
        <ContextMenuAction
          isDangerous
          title={'Delete'}
          icon={<DeleteIcon color={COLORS.attention} />}
          action={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    overflow: 'hidden',
  },
  delimeter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.secondaryFaint,
  },
  triangleContainer: {
    position: 'absolute',
    top: -rem(18) + rem(4),
    right: rem(20),
  },
});
