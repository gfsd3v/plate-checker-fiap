"use strict";

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight,
  NativeModules
} from "react-native";
import { StackNavigator } from "react-navigation";
import styles from "./styles/styles.js";

import ALPRCameraScreen from "./screens/ALPRCameraScreen.js";

var CameraClass = require("NativeModules").CameraClass;
console.log("logging this");
console.log(CameraClass);

const PlateChecker = StackNavigator({
  Home: { screen: ALPRCameraScreen }
});

AppRegistry.registerComponent("PlateChecker", () => PlateChecker);
