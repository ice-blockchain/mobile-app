import * as React from 'react';
import {Text, View, StyleSheet, Image, ImageRequireSource} from 'react-native';
import {screenWidth} from 'rn-units';

interface WelcomeItemProps {
  title: string;
  image: ImageRequireSource;
  text: JSX.Element;
  index: string;
}

const WelcomeItem = ({title, image, text}: WelcomeItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={{width: screenWidth - 80, height: screenWidth - 80}}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        {text}
      </View>
    </View>
  );
};

export default WelcomeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 21,
  },
});
