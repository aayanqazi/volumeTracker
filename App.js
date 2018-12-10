
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./src/index";
import Search from "./src/Search";

const AppNavigator = createStackNavigator({
  Home: {
    screen: Main
  },
  Search: {
    screen: Search
  }
},{
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);

