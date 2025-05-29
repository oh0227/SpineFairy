import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ActivityIndicator, View } from "react-native";

import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";

import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import AnalysisScreen from "../screens/AnalysisScreen";
import RecommendScreen from "../screens/ReccomendScreen";

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
          <MaterialIcons name="dashboard" size={24} color="black" />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Analysis"
      component={AnalysisScreen}
      options={{
        tabBarLabel: "Analysis",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="insert-chart" size={24} color="black" />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Train"
      component={RecommendScreen}
      options={{
        tabBarLabel: "Train",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="walking" size={24} color="black" />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: "Setting",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Group>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Group>
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

  return <TabNavigator />;
};

export default MainNavigator;
