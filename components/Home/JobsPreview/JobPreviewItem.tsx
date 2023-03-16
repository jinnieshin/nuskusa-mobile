import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { PostSummary } from "../../../types/PostSummary";
import { useEffect, useState } from "react";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import { AntDesign } from "@expo/vector-icons";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";
import { setRefresh } from "../../../redux/features/refresher";
import timeAgo from "../../TimeAgo";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  navigation: any;
  post: PostSummary;
  content: string;
  time: number;
};

const JobPreviewItem = ({ navigation, post, content, time }: Props) => {
  const [item, setItem] = useState<any>();

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.value);

  useEffect(() => {
    fetchPostUpVote(post);
  }, []);

  const fetchPostUpVote = async (postItem: PostSummary) => {
    const url = REACT_APP_HOST + "/api/post/getPost/" + postItem.id;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status == 200) {
      const post = await response.json();
      post.lastModified = new Date(post.updatedAt);
      post.lastModified.setHours(post.lastModified.getHours() - 8);
      setItem(post);
    }
  };

  const navigateToPost = () => {
    dispatch(setCurrentBoardPage("jobs"));
    dispatch(setRefresh());
    navigation.navigate("PostScreen", { postId: post.id, email: user.email });
  };

  return (
    <TouchableOpacity onPress={navigateToPost} style={styles.container}>
      <Text style={styles.contentText}>{content}</Text>
      <Text style={styles.timeStamp}>{timeAgo(new Date(time))}</Text>
      <AntDesign name="heart" size={14} color="#DD0000" />
      <Text style={styles.upvotes}> {item?.upvoteCount}</Text>
    </TouchableOpacity>
  );
};

export default JobPreviewItem;

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
    flex: 0.2,
  },
  upvotes: {
    fontSize: 12,
    flex: 0.15,
  },
});
