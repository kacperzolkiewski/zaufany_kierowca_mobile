import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Modal as PaperModal } from "react-native-paper";

const { width } = Dimensions.get("window");

export const useModal = (
  title: string,
  onApprove: () => void,
  approveButtonText: string,
  onNotApprove?: () => void,
  notApproveButtonText?: string
) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const Modal = (
    <PaperModal
      dismissableBackButton
      dismissable={false}
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}
    >
      <Title style={{ textAlign: "center", marginBottom: 40 }}>{title}</Title>
      <Button
        mode="contained"
        onPress={() => {
          onApprove();
          hideModal();
        }}
      >
        {approveButtonText}
      </Button>
      {onNotApprove ? (
        <Button
          style={{ marginTop: 20 }}
          mode="outlined"
          onPress={() => {
            onNotApprove();
            hideModal();
          }}
        >
          {notApproveButtonText}
        </Button>
      ) : null}
    </PaperModal>
  );

  return {
    Modal,
    showModal,
  };
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "white",
    width: 0.9 * width,
    padding: 20,
    borderRadius: 10,
  },
});
