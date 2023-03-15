import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { View } from "../../../components/Themed";
import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import PostProfileBanner from "../../../components/Board/Post/PostProfileBanner";
import PostContent from "../../../components/Board/Post/PostContent";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import { useSelector } from "react-redux";

const PostScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const postId = route.params.postId;
  const [currentPost, setPost] = useState<any>({});

  const currentBoardPage: string = useSelector(
    (state: any) => state.currentBoardPage.value
  );

  const refresh: string = useSelector((state: any) => state.refresh.value);

  useEffect(() => {
    fetchPost();
  }, [refresh]);

  console.log(REACT_APP_HOST);
  const fetchPost = async () => {
    const url = REACT_APP_HOST + "/api/post/getPost/" + postId;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status == 200) {
      const post = await response.json();
      post.lastModified = new Date(post.updatedAt);
      post.lastModified.setHours(post.lastModified.getHours());
      console.log("Post", post);
      setPost(post);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Banner
        navigation={navigation}
        iconLeft="arrow-back"
        iconRight="ios-notifications-outline"
      />
      <ScrollView style={styles.container}>
        <PostProfileBanner
          name={currentPost?.author?.name}
          boardType={currentBoardPage}
          lastModified={currentPost.lastModified}
        />
        <PostContent
          postId={postId}
          title={currentPost.title}
          content={currentPost.content}
          upvoteCount={currentPost.upvoteCount}
          upvoted={currentPost.upvoted}
          commentCount={currentPost.commentCount}
          author={currentPost.author}
        />
      </ScrollView>
    </View>
  );
};

export default PostScreen;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: height * 0.75,
  },
});
