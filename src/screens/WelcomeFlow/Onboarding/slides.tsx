// SPDX-License-Identifier: ice License 1.0

import {IceLabel, IceLabelProps} from '@components/Labels/IceLabel';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {ImageSourcePropType, StyleSheet, Text} from 'react-native';
import {isAndroid, rem} from 'rn-units';

const ICON_Y_OFFSET = isAndroid ? rem(6) : rem(2);
const ICON_SIZE = rem(23);

const styles = StyleSheet.create({
  stub: {
    fontSize: 1,
  },
  boldStyle: {
    ...font(14, 24, 'bold', 'white'),
  },
});

export interface OnboardingSlide {
  key: string;
  image: ImageSourcePropType;
  title: ReactNode;
  description: ReactNode;
}

const TextIceLabel = (props: IceLabelProps) => {
  return (
    <IceLabel
      iconSize={ICON_SIZE}
      iconOffsetY={ICON_Y_OFFSET}
      textStyle={styles.boldStyle}
      {...props}
    />
  );
};

type DescriptionWrapperProps = {
  children: ReactNode;
};

const DescriptionWrapper = ({children}: DescriptionWrapperProps) => {
  return (
    <>
      {/* on iOS leading space stops IceLabel from incorrect Y offset */}
      <Text style={styles.stub}> </Text>
      {children}
    </>
  );
};

const welcomeDescription = () => {
  let text = replaceString(
    t('welcome.page1.description'),
    tagRegex('ice'),
    (match, index) => <TextIceLabel reversed={isRTL} key={match + index} />,
  );
  return <DescriptionWrapper>{text}</DescriptionWrapper>;
};

const planetDescription = () => {
  let text = replaceString(
    t('welcome.page2.description'),
    tagRegex('ice'),
    (match, index) => <TextIceLabel reversed={isRTL} key={match + index} />,
  );
  return <DescriptionWrapper>{text}</DescriptionWrapper>;
};

const coinDescription = () => {
  let text = replaceString(
    t('welcome.page3.description_part2'),
    tagRegex('ice'),
    (match, index) => <TextIceLabel key={match + index} />,
  );
  return (
    <DescriptionWrapper>
      {t('welcome.page3.description_part1')}
      {'\n'}
      {text}
    </DescriptionWrapper>
  );
};

const stayConnectedDescription = () => {
  let text = replaceString(
    t('welcome.page4.description'),
    tagRegex('iceLogo'),
    (match, index) => <TextIceLabel key={match + index} label={null} />,
  );

  text = replaceString(text, tagRegex('bold', false), (match, index) => (
    <Text key={match + index} style={styles.boldStyle}>
      {match}
    </Text>
  ));

  return <DescriptionWrapper>{text}</DescriptionWrapper>;
};

const notificationDescription = () => {
  let text = replaceString(
    t('welcome.page6.description_part1', {value: 24}),
    tagRegex('ice'),
    (match, index) => <TextIceLabel key={match + index} />,
  );
  return (
    <DescriptionWrapper>
      {text}
      {'\n'}
      {t('welcome.page6.description_part2')}
    </DescriptionWrapper>
  );
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    key: 'welcomeToIce',
    image: require('./assets/images/welcomeToIce.png'),
    title: t('welcome.page1.title'),
    description: welcomeDescription(),
  },
  {
    key: 'planetFriendly',
    image: require('./assets/images/planetFriendly.png'),
    title: t('welcome.page2.title'),
    description: planetDescription(),
  },
  {
    key: 'peoplesCoin',
    image: require('./assets/images/peoplesCoin.png'),
    title: t('welcome.page3.title'),
    description: coinDescription(),
  },
  {
    key: 'stayConnected',
    image: require('./assets/images/stayConnected.png'),
    title: t('welcome.page4.title'),
    description: stayConnectedDescription(),
  },
  {
    key: 'referAndEarn',
    image: require('./assets/images/referAndEarn.png'),
    title: t('welcome.page5.title'),
    description: [t('welcome.page5.description', {value: 25})],
  },
  {
    key: 'notifications',
    image: require('./assets/images/notifications.png'),
    title: t('welcome.page6.title'),
    description: notificationDescription(),
  },
];
