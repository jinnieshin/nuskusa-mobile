import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { PostSummary } from "../../../types/PostSummary";
import { useEffect, useState } from "react";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

type Props = {
  post: PostSummary;
  content: string;
  time: number;
  upvoteCount: number;
};

const PostPreviewItem = ({ post, content, time, upvoteCount }: Props) => {
  const [item, setItem] = useState<any>();

  useEffect(() => {
    fetchPostUpVote(post);
  }, []);

  const fetchPostUpVote = async (postItem: PostSummary) => {
    // console.log(postItem);
    const url = REACT_APP_HOST + "/api/post/getPost/" + postItem.id;
    const response = await fetch(url, {
      method: "GET",
    });

    console.log(response.status);

    if (response.status == 200) {
      const post = await response.json();
      post.lastModified = new Date(post.updatedAt);
      post.lastModified.setHours(post.lastModified.getHours() - 8);
      setItem(post);
      console.log("TERER: ", item);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>{content}</Text>
      <Text style={styles.timeStamp}>{time}분 전</Text>
      <Text style={styles.upvotes}>❤️ {item?.upvoteCount}</Text>
    </View>
  );
};

export default PostPreviewItem;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.83,
    height: 35,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  contentText: {
    fontSize: 12,
    flex: 0.65,
  },
  timeStamp: {
    fontSize: 12,
    flex: 0.15,
  },
  upvotes: {
    fontSize: 12,
    flex: 0.2,
  },
});
