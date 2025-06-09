import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ActivityIndicator, View } from "react-native";

import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";

import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import AnalysisScreen from "../screens/AnalysisScreen";
import RecommendScreen from "../screens/RecommandScreen";
import UploadScreen from "../screens/UploadScreen";
import CameraButton from "../components/CameraButton";
import CameraWarningScreen from "../screens/CameraWarningScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="dashboard" size={24} color={color} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Analysis"
      component={AnalysisScreen}
      options={{
        tabBarLabel: "Analysis",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="insert-chart" size={24} color={color} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Upload"
      component={CameraWarningScreen}
      options={{
        tabBarLabel: "",
        tabBarIcon: () => null, // 아이콘 없음
        tabBarButton: (props) => <CameraButton {...props} />,
      }}
    />

    <Tab.Screen
      name="AI"
      component={RecommendScreen}
      options={{
        tabBarLabel: "AI",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="robot" size={24} color={color} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: "Setting",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CameraWarning"
      component={CameraWarningScreen}
      options={{ title: "주의사항" }}
    />
    <Stack.Screen
      name="Upload"
      component={UploadScreen}
      options={{ title: "사진 업로드" }}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return <StackNavigator />;
};

export default MainNavigator;
