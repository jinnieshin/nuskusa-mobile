import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import BoardPreviewList from "./BoardPreviewList";

const BoardPreviewTab = () => {
  const [tab, setTab] = useState<string>("Hot");

  const handleHotPress = () => {
    setTab("Hot");
  };

  const handleGeneralPress = () => {
    setTab("general");
  };

  const handleFreshmenPress = () => {
    setTab("freshmen");
  };

  const handleGraduatedPress = () => {
    setTab("graduated");
  };

  return (
    <View style={styles.container}>
      {/* Board tabs */}
      <View style={styles.tabsContainer}>
        <TouchableWithoutFeedback onPress={handleHotPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "Hot" ? "#DADADA" : "#e7e8e9" },
            ]}
          >
            <Text style={styles.tabsText}>HOT</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGeneralPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "general" ? "#DADADA" : "#e7e8e9" },
            ]}
          >
            <Text style={styles.tabsText}>자유</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleFreshmenPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "freshmen" ? "#DADADA" : "#e7e8e9" },
            ]}
          >
            <Text style={styles.tabsText}>신입생</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGraduatedPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "graduated" ? "#DADADA" : "#e7e8e9" },
            ]}
          >
            <Text style={styles.tabsText}>졸업생</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BoardPreviewList boardType={tab} />
    </View>
  );
};

export default BoardPreviewTab;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 270,
    backgroundColor: "#e7e8e9",
  },
  tabsContainer: {
    flexDirection: "row",
    height: 42,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabIndivWrapper: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    height: 42,
  },
  tabsText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
