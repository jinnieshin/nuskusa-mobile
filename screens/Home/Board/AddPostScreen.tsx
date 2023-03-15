import {
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from "react-native";
import { View, Text } from "../../../components/Themed";
import Banner from "../../../components/Banner";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImageFile from "../../../components/Board/Post/ImageFile";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import { setRefresh } from "../../../redux/features/refresher";

const AddPostScreen = ({ navigation }: { navigation: any }) => {
  const currentBoardPage: string = useSelector(
    (state: any) => state.currentBoardPage.value
  );

  const userdata: string = useSelector((state: any) => state.user.value);

  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    // console.log("sadad", result);

    if (!result.cancelled) {
      setImage(result?.uri);
      console.log("asdlfkjasldk", result);
    }
  };

  // TODO: upload image only --> upload various file types
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    console.log(image);
    //@ts-ignore
    const ref = userdata.email + "(" + userdata.name + ")_" + image;
    const url = REACT_APP_HOST + "/api/post/uploadPostAttachment/" + image;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    console.log("respones: ", response);
    if (response.status !== 200) {
      Alert.alert("파일 업로드에 실패했습니다. " + response.body);
    }
  };

  const addPost = async () => {
    if (image) {
      await uploadImage();
    }
    const url = REACT_APP_HOST + "/api/post/addPost/" + currentBoardPage;
    // if (image) {
    //   setContent(
    //     '<img src="' +
    //       image +
    //       '" width=' +
    //       width * 0.85 +
    //       "height=" +
    //       width * 0.85 +
    //       "></img>" +
    //       content
    //   );
    // }
    const postObject = {
      title: title,
      content: content,
      isAnnouncement: false, // TODO
      isAnonymous: false, // TODO
      isHidden: false, // TODO
      isPinned: false, // TODO
      isEvent: false,
    };
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(postObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 201) {
      dispatch(setRefresh());
      navigation.navigate("PostList", { boardType: currentBoardPage });
    } else {
      const errMsg = await response.text();
      window.alert("게시글 업로드 도중 문제가 발생하였습니다." + errMsg);
    }
  };

  const confirmation = () => {
    if (title == "") {
      Alert.alert("제목을 작성해주세요");
      return;
    }
    if (content == "") {
      Alert.alert("내용을 작성해주세요");
      return;
    }
    Alert.alert("게시물을 올리겠습니까?", "게시물은 수정, 삭제가 가능합니다.", [
      {
        text: "아니오",
        onPress: () => console.log("아니오 Pressed"),
        style: "cancel",
      },
      { text: "예", onPress: addPost },
    ]);
  };

  const boardTypeToEnglish = {
    공지사항: "announcement",
    "신입생 게시판": "freshmen",
    자유게시판: "general",
    "졸업생 게시판": "graduated",
    벼룩시장: "market",
    "취업/인턴": "jobs",
  };
  const boardTypeToKorean = {
    announcement: "공지사항",
    freshmen: "신입생 게시판",
    general: "자유게시판",
    graduated: "졸업생 게시판",
    market: "벼룩시장",
    jobs: "취업/인턴",
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Banner iconLeft="arrow-back" iconRight="" navigation={navigation} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.body}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.boardType}>
              @{/* @ts-ignore */}
              {boardTypeToKorean[currentBoardPage]}
            </Text>
            <TouchableOpacity onPress={confirmation}>
              <MaterialIcons name="post-add" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <TextInput
              style={{ fontSize: 20, fontWeight: "700" }}
              placeholder="제목"
              multiline={true}
              onChangeText={(title) => setTitle(title)}
            />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
            style={styles.contentContainer}
          >
            <TextInput
              style={styles.postContent}
              multiline={true}
              placeholder="내용을 입력하세요."
              onChangeText={(content) => setContent(content)}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      {image && <ImageFile image={image} />}
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={pickImage}
        >
          <Feather name="camera" size={26} color="black" />
          <Text style={{ fontSize: 13, fontWeight: "500", top: 2 }}>
            {"   "}사진
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddPostScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 17,
    flex: 1,
  },
  boardType: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 5,
  },
  titleContainer: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  contentContainer: {
    marginTop: 10,
    // borderWidth: 1,
    borderColor: "#e6e6e6",
    height: 250,
  },
  postContent: {
    fontSize: 13.5,
    padding: 5,
  },
  imagePickerContainer: {
    padding: 15,
    paddingLeft: 25,
    paddingRight: 230,
  },
});
