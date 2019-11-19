"use strict";

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight
} from "react-native";
import { StackNavigator } from "react-navigation";

import styles from "./styles/styles.js";

import ALPRCameraScreen from "./screens/ALPRCameraScreen.js";

const PlateChecker = StackNavigator({
  Home: { screen: ALPRCameraScreen }
});

AppRegistry.registerComponent("PlateChecker", () => PlateChecker);
