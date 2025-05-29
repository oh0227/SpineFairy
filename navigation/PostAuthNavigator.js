import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainNavigator from "./MainNavigator";
import UserInfoScreen from "../screens/UserInfoScreen";

const Stack = createNativeStackNavigator();

const PostAuthNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {props.isSetUp ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <>
          <Stack.Screen name="AccountSetUp" component={UserInfoScreen} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default PostAuthNavigator;
