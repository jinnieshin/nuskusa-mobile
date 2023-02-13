import { View, Text } from "../../../components/Themed";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React from "react";

const ImageFile = ({ image }: { image: string }) => {
  const [modal, setModal] = React.useState<boolean>(false);

  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleModal}>
      <View style={{ flex: 0.2 }}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text>이미지 파일</Text>
      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 13,
          }}
        >
          <Button title="닫기" onPress={handleModal} />
          <Button title="삭제" onPress={handleModal} color="red" />
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 50 }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: width * 0.95, height: width * 0.95 }}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImageFile;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#d9d9d9",
    width: width,
    height: 60,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "#ff0000",
  },
});
