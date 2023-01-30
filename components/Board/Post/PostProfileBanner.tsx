import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Octicons, Feather } from "@expo/vector-icons";

type Props = {
  name: any;
  // lastModified: any;
  // boardType: string;
};

const PostProfileBanner = ({ name }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.profileImage} />
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={[styles.subtitles, { top: -2 }]}>
                {" "}
                @신입생 게시판
              </Text>
            </View>
            <Text style={styles.subtitles}>
              2분 전 (최근 수정: 10/21 13:49)
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="share-2" size={28} color="black" />
        </View>
      </View>
    </View>
  );
};

export default PostProfileBanner;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 50,
    alignSelf: "center",
    padding: 3,
    marginBottom: 10,
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    backgroundColor: "#D9D9D9",
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
  },
  subtitles: {
    fontSize: 11,
    marginTop: 3,
  },
  count: {
    fontSize: 13,
    fontWeight: "700",
  },
  lowerContainer: {
    marginTop: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    fontSize: 12,
    marginTop: 3,
  },
});
