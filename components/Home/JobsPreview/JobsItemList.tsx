import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import PostPreviewItem from "../BoardPreview/PostPreviewItem";
import { PostSummary } from "../../../types/PostSummary";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import JobPreviewItem from "./JobPreviewItem";
import { useDispatch } from "react-redux";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";

const JobsItemList = ({ navigation }: { navigation: any }) => {
  const [board, setBoard] = useState({});
  const [permission, setPermission] = useState({});
  const [postArr, setPostArray] = useState<any[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBoard().catch(console.error);
    fetchPosts().catch(console.error);
  }, []);

  const navigateJobs = () => {
    // ERROR: When logged into the app for the first time, before navigating to the boardscreen,
    // navigation will not work.
    dispatch(setCurrentBoardPage("jobs"));
    navigation.navigate("PostList", { boardType: "jobs" });
  };

  const fetchBoard = async () => {
    const url = REACT_APP_HOST + "/api/board/getBoard/";
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const data = await response.json();
      const board = data.data;
      const permissions = data.permissions;
      const boardObject = {
        title: board.title,
        description: board.description,
        boardId: board.boardId,
        boardColor: board.boardColor,
        boardTextColor: board.boardTextColor,
      };
      setBoard(boardObject);
      setPermission(permission);
    }
  };

  const fetchPosts = async () => {
    const url = REACT_APP_HOST + "/api/board/getPosts/" + "jobs";
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      const postArray = [];
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postObject: any = {
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
        if (postArray.length == 6) {
          // Maintain the number of preview posts to the most recent 7 posts
          postArray.shift;
        }
      }
      setPostArray(postArray);
    }
  };
  return (
    <View>
      <Text style={styles.title}>취업/인턴</Text>
      <View style={styles.container}>
        <View style={{ justifyContent: "space-between" }}>
          {/* <Text>{boardType}</Text> */}
          <View style={styles.itemsContainer}>
            {/* <FlatList
          data={postArr}
          renderItem={({ item }) => (
            // <View style={{width: }}>
            
            // </View>
          )}
          showsVerticalScrollIndicator={false}
        /> */}
            {postArr.map((item) => (
              <JobPreviewItem
                navigation={navigation}
                post={item}
                content={item.title}
                time={item.createdAt}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.viewAllContainer}
            onPress={navigateJobs}
          >
            <Text style={styles.viewAllButtonText}>+ View All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 230,
    backgroundColor: "#F3F4F6",
    paddingTop: 3,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 16,
  },
  itemsContainer: {
    alignItems: "center",
    height: 193,
  },
  viewAllContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
});

export default JobsItemList;
