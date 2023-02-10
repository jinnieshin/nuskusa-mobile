import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { View, Text } from "../../../components/Themed";
import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import BoardHeader from "../../../components/Board/BoardHeader";
import Pinned from "../../../components/Board/Pinned";
import PostThumbnail from "../../../components/Board/PostThumbnail";
import { PostSummary } from "../../../types/PostSummary";
import DropDownList from "../../../components/Board/DropDownList";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { setShowBoardDropDownList } from "../../../redux/features/showBoardDropDownList";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const PostList = ({ navigation, route }: { navigation: any; route: any }) => {
  // const boardType = "freshmen";
  const [postArr, setPostArray] = useState<PostSummary[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const { boardType } = route.params;

  const dispatch = useDispatch();

  const currentBoardPage: string = useSelector(
    (state: any) => state.currentBoardPage.value
  );

  const showDropDownList = useSelector(
    (state: any) => state.showBoardDropDownList.value
  );

  const boardTypeToKorean = {
    announcement: "공지사항",
    freshmen: "신입생 게시판",
    general: "자유게시판",
    graduated: "졸업생 게시판",
    market: "벼룩시장",
    jobs: "취업/인턴",
  };

  useEffect(() => {
    fetchPosts();
  }, [currentBoardPage]);

  const fetchPosts = async () => {
    const url = REACT_APP_HOST + "/api/board/getPosts/" + currentBoardPage;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      const postArray = [];
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postObject: PostSummary = {
          id: post.id,
          title: post.title,
          content: post.content,
          isAnnouncement: post.isAnnouncement,
          isHidden: post.isHidden,
          isAnonymous: post.isAnonymous,
          isPinned: post.isPinned,
          isEvent: post.isEvent,
          lastModified: new Date(post.updatedAt),
          author: post.author,
          // upvoteCount: post.upvoteCount,
        };
        postObject.lastModified.setHours(
          postObject.lastModified.getHours() - 8
        );
        // postArray.push(postObject);
        postArray.push(post);
      }
      setPostArray(postArray);
    }
  };

  const handleDropDownList = () => {
    dispatch(setShowBoardDropDownList(!showDropDownList));
  };

  return (
    <View style={{ flex: 1 }}>
      <Banner
        navigation={navigation}
        iconLeft="menu"
        iconRight="ios-notifications-outline"
      />

      {showDropDownList && (
        //@ts-ignore
        <DropDownList currentPage={boardTypeToKorean[currentBoardPage]} />
      )}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableWithoutFeedback onPress={handleDropDownList}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.currentBoard}>
                {/* @ts-ignore */}
                {boardTypeToKorean[currentBoardPage]}
              </Text>
              <FontAwesome
                name="sort-down"
                size={24}
                color="black"
                style={{ marginLeft: 10, top: -3 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <Feather name="edit" size={24} color="black" />
        </View>
        <Pinned />
        <View style={{ height: height - 300 }}>
          <FlatList
            data={postArr}
            renderItem={({ item }) => (
              <PostThumbnail
                navigation={navigation}
                id={item.id}
                content={item.content}
                name={item.author}
                title={item.title}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default PostList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 17,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentBoard: {
    fontSize: 22,
    fontWeight: "700",
  },
});
