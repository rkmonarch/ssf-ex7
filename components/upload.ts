import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Upload() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // requestPermission();
    // Camera permissions are still loading.
    return React.createElement(View, null);
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return React.createElement(
      View,
      null,
      React.createElement(
        Text,
        null,
        "Camera permissions are not granted yet."
      ),
      React.createElement(Button, {
        title: "Request Permissions",
        onPress: requestPermission,
      })
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(CameraView, {
      style: styles.camera,
      onCameraReady: () => {
        console.log("Camera ready!");
      },
    }),
    React.createElement(
      View,
      { style: styles.buttonContainer },
      React.createElement(
        TouchableOpacity,
        { style: styles.button, onPress: toggleCameraFacing },
        React.createElement(Text, { style: styles.text }, "Flip Camera")
      )
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
