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

const BoardPreviewTab = ({ navigation }: { navigation: any }) => {
  const [tab, setTab] = useState<string>("general");

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
              { backgroundColor: tab != "Hot" ? "#DADADA" : "#F3F4F6" },
            ]}
          >
            <Text style={styles.tabsText}>HOT</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGeneralPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "general" ? "#DADADA" : "#F3F4F6" },
            ]}
          >
            <Text style={styles.tabsText}>자유</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleFreshmenPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "freshmen" ? "#DADADA" : "#F3F4F6" },
            ]}
          >
            <Text style={styles.tabsText}>신입생</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGraduatedPress}>
          <View
            style={[
              styles.tabIndivWrapper,
              { backgroundColor: tab != "graduated" ? "#DADADA" : "#F3F4F6" },
            ]}
          >
            <Text style={styles.tabsText}>졸업생</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BoardPreviewList navigation={navigation} boardType={tab} />
    </View>
  );
};

export default BoardPreviewTab;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 270,
    backgroundColor: "#F3F4F6",
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
