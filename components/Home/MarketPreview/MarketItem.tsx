import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const MarketItem = () => {
  return (
    <View style={styles.container}>
      {/* Image section */}
      <View style={styles.imageContainer} />

      {/* Details section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          맥북 프로 16인치 2021년형 1TB SSD 팔아요
        </Text>
        {/* Likes, comments and time */}
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 10, marginRight: 10 }}>2시간 전</Text>
          <FontAwesome5 name="comment" size={14} color="black" />
          <Text style={{ fontSize: 10, fontWeight: "700", marginRight: 10 }}>
            {"  "}3
          </Text>
          <AntDesign name="heart" size={14} color="#DD0000" />
          <Text style={{ fontSize: 10, fontWeight: "700", marginRight: 10 }}>
            {"  "}3
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MarketItem;

const styles = StyleSheet.create({
  container: {
    height: 95,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 90,
    height: 68,
    backgroundColor: "#DADADA",
    flex: 0.32,
    marginRight: 20,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 0.68,
    height: 68,
  },
  title: {
    fontSize: 12.5,
  },
  infoContainer: {
    flexDirection: "row",
  },
});
