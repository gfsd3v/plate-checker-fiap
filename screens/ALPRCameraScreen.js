"use strict";

import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";

import Camera from "react-native-openalpr";

import axios from "axios";

import styles from "../styles/styles.js";

const headers = {
  Accept: "/",
  "Accept-Encoding": "gzip, deflate",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Content-Type": "application/json",
  Host: "apicarros.com",
  "Postman-Token":
    "2f7a1326-7ccb-4616-b27f-ca971bae1959,9b34eb13-0f2d-419c-a7d8-0155cedd7872",
  "User-Agent": "PostmanRuntime/7.15.2",
  "cache-control": "no-cache"
};

class ALPRCameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill
      },
      plate: "poscione a camera em direcao a placa"
    };
  }

  onPlateRecognized = async ({ plate, confidence }) => {
    if (confidence > 0.9) {
      try {
        const serverResponse = await axios.get(
          `https://apicarros.com/v1/consulta/${plate}/json`,
          { headers }
        );

        const vehicle = serverResponse.data;
        this.setState({
          plate: `{Placa: ${vehicle.placa} Situacao: ${vehicle.mensagemRetorno} Modelo: ${vehicle.modelo} Ano: ${vehicle.ano}`
        });
      } catch (e) {
        this.setState({
          plate: e.toString()
        });
      }
    } else {
      this.setState({
        plate:
          "nao conseguimos indentificar com precisao a placa, favor tente novamente"
      });
    }
  };

  render() {
    return (
      <View>
        <View>
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.camera}
            aspect={this.state.camera.aspect}
            captureQuality={Camera.constants.CaptureQuality.medium}
            country="eu"
            onPlateRecognized={this.onPlateRecognized}
            plateOutlineColor="#ff0000"
            showPlateOutline
            torchMode={Camera.constants.TorchMode.off}
            touchToFocus
          />
        </View>
        <View>
          <Text style={styles.text}>{this.state.plate}</Text>
        </View>
      </View>
    );
  }
}

export default ALPRCameraScreen;
