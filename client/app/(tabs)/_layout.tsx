

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="home" 
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} /> 
          ),
        }} 
      />

      <Tabs.Screen 
        name="search" 
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }} 
      />

      <Tabs.Screen 
        name="job" 
        options={{
          title: "Jobs",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" color={color} size={size} />
          ),
        }} 
      />

      <Tabs.Screen 
        name="network" 
        options={{
          title: "Network",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }} 
      />
    </Tabs>
  );
};

export default _layout;
