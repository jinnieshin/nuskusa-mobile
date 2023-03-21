import { Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Pinned = ({ navigation, boardType, email } : { navigation: any; boardType: any, email: any }) => {
  const[postId, setPostId] = useState<number>(3)
  const[postTitle, setPostTitle] = useState<string>("NUS 한인회에 오신 여러분을 환영합니다!")

  useEffect(() => {
    switch(boardType) {
      case "freshmen": {
        setPostId(6);
        setPostTitle("신입생 게시판 안내");
        break;
      }
      case "general": {
        setPostId(10);
        setPostTitle("자유게시판 안내");
        break;
      }
      case "graduated": {
        setPostId(11);
        setPostTitle("졸업생 게시판 안내");
        break;
      }
      case "market": {
        setPostId(15);
        setPostTitle("벼룩시장 게시판 안내");
        break;
      }
      case "jobs": {
        setPostId(12);
        setPostTitle("취업/인턴 게시판 안내");
        break;
      }
      default: {
        setPostId(3);
        setPostTitle("NUS 한인회에 오신 여러분을 환영합니다!")
        break;
      }
    }
  })

  const handlePostPress = () => {
    navigation.navigate("PostScreen", { postId: postId, email: email });
  };

  return (
    <TouchableOpacity onPress={handlePostPress} style={styles.container}>
      <Text style={styles.pinned}>Pinned</Text>
      <Text style={styles.content}>{postTitle}</Text>
    </TouchableOpacity>
  );
};

export default Pinned;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 32,
    backgroundColor: "#e6e7e8",
    alignSelf: "center",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 15,
  },
  pinned: {
    fontWeight: "700",
    flex: 0.2,
  },
  content: {
    fontSize: 12,
    flex: 0.8,
  },
});
