// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {LogoIconSvg} from '@svg/LogoIcon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

interface TeamHomeScreenProps {}

type TTeamMember = {
  nickname: string;
  isIceMember: boolean;
};
const mockTeamMembers: TTeamMember[] = [
  {nickname: '@mysterioX', isIceMember: true},
  {nickname: '@johnny327', isIceMember: true},
  {nickname: '@MissMistiq', isIceMember: true},
  {nickname: '@thesempeerwwwerr', isIceMember: false},
  {nickname: '@Septiemma', isIceMember: false},
  {nickname: '@Deemer', isIceMember: false},
];

export const TeamHomeScreen = ({}: TeamHomeScreenProps) => {
  const renderTeamMember = ({item}: {item: TTeamMember}) => {
    return (
      <TouchableOpacity style={styles.memberContainer} activeOpacity={0.6}>
        <View style={styles.memberImage}>
          {item.isIceMember ? (
            <View style={styles.memberIcon}>
              <LogoIconSvg
                color={COLORS.white}
                width={rem(15)}
                height={rem(15)}
              />
            </View>
          ) : null}
        </View>

        <Text style={styles.memberNickname} numberOfLines={1}>
          {item.nickname}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSeparator = () => <View style={styles.separator} />;
  const keyExtractor = (key: TTeamMember) => key.nickname;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headerTextBold}>{'TEAM'}</Text>

        <TouchableOpacity style={styles.viewTeam}>
          <Text style={styles.headerText}>{'view team'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={mockTeamMembers}
        renderItem={renderTeamMember}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.memberContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(22),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rem(16),
  },
  headerTextBold: {
    marginLeft: rem(23),
    fontSize: font(14),
    fontFamily: FONTS.primary.black,
    lineHeight: rem(14),
    color: COLORS.darkBlue,
  },
  headerText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.regular,
    lineHeight: rem(14),
    color: COLORS.darkBlue,
  },
  viewTeam: {
    paddingHorizontal: rem(23),
    paddingVertical: rem(8),
  },
  memberContainer: {
    width: rem(60),
  },
  memberImage: {
    width: rem(60),
    height: rem(60),
    backgroundColor: COLORS.greyText,
    borderRadius: rem(20),
  },
  memberNickname: {
    fontSize: font(10),
    fontFamily: FONTS.primary.regular,
    lineHeight: rem(12),
    color: COLORS.greyText,
    marginTop: rem(5),
  },
  separator: {
    width: rem(19),
  },
  memberContent: {
    paddingHorizontal: rem(23),
  },
  memberIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.persianBlue,
    width: rem(23),
    height: rem(23),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(23 / 2),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
