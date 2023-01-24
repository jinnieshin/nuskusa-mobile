import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import PostProfileBanner from "../../../components/Board/Post/PostProfileBanner";
import PostContent from "../../../components/Board/Post/PostContent";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const PostScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const postId = route.params.postId;
  const [currentPost, setPost] = useState<any>({});

  console.log(postId);
  useEffect(() => {
    fetchPost();
    console.log(currentPost);
  }, []);

  console.log(REACT_APP_HOST);
  const fetchPost = async () => {
    const url = REACT_APP_HOST + "/api/post/getPost/" + postId;
    const response = await fetch(url, {
      method: "GET",
    });

    console.log(response.status);

    if (response.status == 200) {
      const post = await response.json();
      post.lastModified = new Date(post.updatedAt);
      post.lastModified.setHours(post.lastModified.getHours() - 8);
      console.log("Success");
      setPost(post);
    }
  };

  return (
    <View>
      <Banner
        navigation={navigation}
        iconLeft="arrow-back"
        iconRight="ios-notifications-outline"
      />
      <ScrollView style={styles.container}>
        <PostProfileBanner name={currentPost?.author?.name} />
        <PostContent
          title={currentPost?.title}
          content={currentPost?.content}
        />
      </ScrollView>
    </View>
  );
};

export default PostScreen;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: height * 0.75,
  },
});
