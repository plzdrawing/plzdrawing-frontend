import React, { useEffect, useRef } from "react";
import { StyleSheet, Pressable, Animated } from "react-native";
import Colors from '@/src/constants/Colors';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onValueChange,
}) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value, animation]);

  const trackAnimatedStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.colors.light_gray2, Colors.colors.sub_yellow],
    }),
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.colors.dark_gray1, Colors.colors.main_yellow],
    }),
  };

  const thumbAnimatedStyle = {
    left: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 25],
    }),
  };

  return (
    <Pressable onPress={() => onValueChange(!value)} style={styles.container}>
      <Animated.View style={[styles.track, trackAnimatedStyle]}>
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 20,
    justifyContent: "center",
  },
  track: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 1,
  },
  thumb: {
    position: "absolute",
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#ffffff",
    top: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default ToggleSwitch;
