import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostPreviewItem from "./PostPreviewItem";
import { PostSummary } from "../../../types/PostSummary";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

type Props = {
  navigation: any;
  boardType: string;
};

const BoardPreviewList = ({ navigation, boardType }: Props) => {
  const [board, setBoard] = useState({});
  const [permission, setPermission] = useState({});
  const [postArr, setPostArray] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useSelector((state: any) => state.refresh.value);
  useEffect(() => {
    fetchBoard().catch(console.error);
    fetchPosts().catch(console.error);
  }, [boardType, refresh]);

  const dispatch = useDispatch();

  const navigateBoard = () => {
    dispatch(setCurrentBoardPage(boardType));
    navigation.navigate("PostList", { boardType: boardType });
  };

  const fetchBoard = async () => {
    setLoading(true);
    const url = REACT_APP_HOST + "/api/board/getBoard/" + boardType;
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
      setLoading(false);
    }
  };

  console.log(postArr.length);

  const fetchPosts = async () => {
    setLoading(true);
    const url = REACT_APP_HOST + "/api/board/getPosts/" + boardType;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      const postArray = [];
      const numOfItems = posts.length > 6 ? 6 : posts.length; // max items -> 6
      for (let i = 0; i < numOfItems; i++) {
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
      }

      setPostArray(postArray);
      setLoading(false);
    }
  };

  const fetchPostUpVote = async (post: any) => {
    const url = REACT_APP_HOST + "/api/post/getPosts/" + post.id;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status == 200) {
      const post = await response.json();
      post.lastModified = new Date(post.updatedAt);
      post.lastModified.setHours(post.lastModified.getHours() - 8);
      return post;
    }
  };

  return (
    <View>
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
          {loading ? (
            <ActivityIndicator style={{ marginTop: 20 }} />
          ) : (
            postArr.map((item: any) => (
              <PostPreviewItem
                post={item}
                content={item.title}
                time={item.createdAt}
                upvoteCount={1}
              />
            ))
          )}
        </View>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={navigateBoard}
        >
          <Text style={styles.viewAllButtonText}>+ View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardPreviewList;

const styles = StyleSheet.create({
  itemsContainer: {
    alignItems: "center",
    height: 213,
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
