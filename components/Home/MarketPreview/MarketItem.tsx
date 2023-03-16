import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import timeAgo from "../../TimeAgo";
import { PostSummary } from "../../../types/PostSummary";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBoardPage } from "../../../redux/features/currentBoardPage";
import { setRefresh } from "../../../redux/features/refresher";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

type Props = {
  navigation: any;
  post: any;
  title: string;
  time: any;
};

const MarketItem = ({ navigation, post, title, time }: Props) => {
  const [item, setItem] = useState<any>();

  const refresh = useSelector((state: any) => state.refresh.value);
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPostDetails(post);
  }, [refresh]);

  const fetchPostDetails = async (postItem: PostSummary) => {
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
    dispatch(setCurrentBoardPage("market"));
    dispatch(setRefresh());
    navigation.navigate("PostScreen", { postId: post.id, email: user.email });
  };

  return (
    <TouchableOpacity onPress={navigateToPost} style={styles.container}>
      {/* Image section */}
      <View style={styles.imageContainer} />

      {/* Details section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* Likes, comments and time */}
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 10, marginRight: 10 }}>
            {timeAgo(new Date(time))}
          </Text>
          <FontAwesome5 name="comment" size={14} color="black" />
          <Text style={{ fontSize: 10, fontWeight: "700", marginRight: 10 }}>
            {"  "}
            {item?.commentCount}
          </Text>
          <AntDesign name="heart" size={14} color="#DD0000" />
          <Text style={{ fontSize: 10, fontWeight: "700", marginRight: 10 }}>
            {"  "}
            {item?.upvoteCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MarketItem;

const styles = StyleSheet.create({
  container: {
    height: 95,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 90,
    height: 68,
    backgroundColor: "#DADADA",
    flex: 0.32,
    marginRight: 20,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 0.68,
    height: 68,
  },
  title: {
    fontSize: 12.5,
  },
  infoContainer: {
    flexDirection: "row",
  },
});
