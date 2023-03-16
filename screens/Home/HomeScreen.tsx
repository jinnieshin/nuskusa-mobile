import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import BoardPreviewTab from "../../components/Home/BoardPreview/BoardPreviewTab";
import MarketItemList from "../../components/Home/MarketPreview/MarketItemList";
import JobsItemList from "../../components/Home/JobsPreview/JobsItemList";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoardPage } from "../../redux/features/currentBoardPage";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {}, []);
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.value);

  const navigateToAnnouncement = async () => {
    dispatch(setCurrentBoardPage("announcement"));
    const url = REACT_APP_HOST + "/api/board/getPosts/" + "announcement";
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      // navigate to the most top post; DOES NOT EXCLUDE PINNED POSTS
      const recentAnnouncementId = posts[0].id;
      navigation.navigate("PostScreen", {
        postId: recentAnnouncementId,
        email: user.email,
      });
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
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
        <TouchableOpacity
          onPress={navigateToAnnouncement}
          style={styles.announcementContainer}
        >
          <Text style={styles.announcementLabel}>공지</Text>
          <Text style={styles.announcementContent}>
            안녕하세요 NUS 한인회입니다
          </Text>
        </TouchableOpacity>
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
    // alignItems: "center",
  },
  announcementContainer: {
    // marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    width: width * 0.9,
    height: 35,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  announcementLabel: {
    fontWeight: "700",
    fontSize: 13,
    flex: 0.12,
  },
  announcementContent: {
    flex: 0.88,
    fontSize: 12,
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
