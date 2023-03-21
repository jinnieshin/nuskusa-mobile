import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  View,
  Text
} from "react-native";
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
  const [postArr, setPostArray] = useState<any>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const currentBoardPage: string = useSelector(
    (state: any) => state.currentBoardPage.value
  );

  const showDropDownList = useSelector(
    (state: any) => state.showBoardDropDownList.value
  );

  const refresh = useSelector((state: any) => state.refresh.value);

  const navigateAddPost = () => {
    navigation.navigate("AddPostScreen");
  };
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
  }, [currentBoardPage, refresh]);

  const fetchPosts = async () => {
    setLoading(true);
    const url = REACT_APP_HOST + "/api/board/getPosts/" + currentBoardPage;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      const postArray = [];
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postObject = {
          id: post.id,
          title: post.title,
          content: post.content,
          isAnnouncement: post.isAnnouncement,
          isHidden: post.isHidden,
          isAnonymous: post.isAnonymous,
          isPinned: post.isPinned,
          isEvent: post.isEvent,
          lastModified: new Date(post.createdAt),
          author: post.author,
          email: post.email,
          // profileImage: post.profileImage,
          // upvoteCount: post.upvoteCount,
        };
        postObject.lastModified.setHours(
          postObject.lastModified.getHours() - 8
        );
        // postArray.push(postObject);
        postArray.push(post);
      }
      setPostArray(postArray);
      setLoading(false);
    }
  };

  const handleDropDownList = () => {
    dispatch(setShowBoardDropDownList(!showDropDownList));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          <TouchableOpacity onPress={navigateAddPost}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Pinned navigation={navigation} boardType={currentBoardPage} email="nuskusa@gmail.com" />
        <View style={{ height: height - 300 }}>
          {loading ? (
            <ActivityIndicator style={{ marginTop: 5 }} />
          ) : (
            <FlatList
              data={postArr}
              renderItem={({ item }) =>
                !item.isHidden ? (
                  <PostThumbnail
                    navigation={navigation}
                    id={item.id}
                    content={item.content}
                    name={item.author}
                    title={item.title}
                    isPinned={item.isPinned}
                    lastModified={item.updatedAt}
                    email={item.email}
                    // profileImage={item?.profileImageUrl}
                  />
                ) : (
                  <></>
                )
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PostList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    paddingHorizontal: 17,
    backgroundColor: "white"
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
