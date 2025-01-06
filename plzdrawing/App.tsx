import "react-native-gesture-handler"; // 반드시 첫 줄에 추가
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Navigation from "@/src/navigation/Navigation";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Ssurround: require("./assets/fonts/Ssurround.ttf"),
      SsurroundAir: require("./assets/fonts/SsurroundAir.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Navigation />;
}
