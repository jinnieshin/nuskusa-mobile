import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { View, Text } from "../../components/Themed";
import React from "react";
import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import BoardPreviewTab from "../../components/Home/BoardPreview/BoardPreviewTab";
import MarketItemList from "../../components/Home/MarketPreview/MarketItemList";
import JobsItemList from "../../components/Home/JobsPreview/JobsItemList";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {}, []);

  return (
    <View>
      <Banner
        navigation={navigation}
        iconLeft="menu"
        iconRight="ios-notifications-outline"
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.announcementContainer}>
          <Text style={styles.announcementLabel}>공지</Text>
          <Text style={styles.announcementContent}>
            안녕하세요 NUS 한인회입니다
          </Text>
        </View>
        <View style={styles.boardPreviewContainer}>
          <BoardPreviewTab navigation={navigation} />
        </View>
        <View style={styles.boardPreviewContainer}>
          <Text style={styles.title}>벼룩시장</Text>
          <MarketItemList navigation={navigation} />
        </View>

        <View>
          <JobsItemList navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 21,
    // alignItems: "center",
  },
  announcementContainer: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#e7e8e9",
    width: width * 0.9,
    height: 35,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  announcementLabel: {
    fontWeight: "700",
    fontSize: 15,
    flex: 0.15,
  },
  announcementContent: {
    flex: 0.85,
  },
  boardPreviewContainer: {
    marginTop: 30,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
  },
});
