import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MarketItem from "./MarketItem";
import { useDispatch } from "react-redux";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const MarketItemList = ({ navigation }: { navigation: any }) => {
  const [postArr, setPostArray] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigateMarket = () => {
    dispatch(setCurrentBoardPage("market"));
    navigation.navigate("PostList", { boardType: "market" });
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    setLoading(true);
    const url = REACT_APP_HOST + "/api/board/getPosts/" + "market";
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status == 200) {
      const posts = await response.json();
      const postArray = [];
      const numOfItems = posts.length > 3 ? 3 : posts.length; // max items -> 3
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

  return (
    <View style={styles.container}>
      <View style={{ minHeight: 285 }}>
        {postArr.map((item: any) => (
          <MarketItem
            navigation={navigation}
            post={item}
            title={item.title}
            time={item.createdAt}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.viewAllContainer}
        onPress={navigateMarket}
      >
        <Text style={styles.viewAllButtonText}>+ View All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MarketItemList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 320,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 13,
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
