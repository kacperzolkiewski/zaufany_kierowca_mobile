import { BottomContainer } from "@/components/BottomContainer";
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { FullScreenContainer } from "@/components/FullScreenContainer";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { HeaderWithInformation } from "@/components/HeaderWithInformation";
import { AuthenticatedStackScreenProps } from "@/features/navigation/types/authenticatedStack";
import StarIcon from "@/features/opinions/assets/starIcon.svg";
import StarOutlineIcon from "@/features/opinions/assets/starOutlineIcon.svg";
import { useModal } from "@/hooks/useModal";
import { useCreateOpinionMutation } from "@/redux/api/opinionsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { AddOpinionInput, addOpinionSchema } from "../schemas/addOpinionSchema";

const Star = ({
  currentStarsNum,
  setCurrentStarsNum,
  id,
}: {
  currentStarsNum: number;
  setCurrentStarsNum: (starsNum: number) => void;
  id: number;
}) => (
  <Pressable
    onPress={() => {
      setCurrentStarsNum(id);
    }}
  >
    {currentStarsNum >= id ? (
      <StarIcon width={30} height={30} color="gold" />
    ) : (
      <StarOutlineIcon width={30} height={30} color="gold" />
    )}
  </Pressable>
);

const AddStarsComponent = ({
  currentStarsNum,
  setCurrentStarsNum,
}: {
  currentStarsNum: number;
  setCurrentStarsNum: (starsNum: number) => void;
}) => {
  const createStars = useCallback(() => {
    const stars: JSX.Element[] = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          currentStarsNum={currentStarsNum}
          id={i}
          setCurrentStarsNum={setCurrentStarsNum}
        />
      );
    }

    return stars;
  }, [currentStarsNum]);

  return (
    <View style={{ width: "100%", flexDirection: "row" }}>{createStars()}</View>
  );
};

export const AddOpinionView = ({
  navigation,
  route: {
    params: { receiverId },
  },
}: AuthenticatedStackScreenProps<"AddOpinion">) => {
  const [createOpinion, { isLoading, isSuccess, isError }] =
    useCreateOpinionMutation();
  const methods = useForm<AddOpinionInput>({
    resolver: zodResolver(addOpinionSchema),
  });
  const { Modal, showModal } = useModal(
    "Pomyślnie dodano opinię",
    () => navigation.goBack(),
    "Ok"
  );
  const [stars, setStars] = useState(1);
  const { trigger, handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<AddOpinionInput> = ({ opinion }) => {
    createOpinion({ stars, receiverId, comment: opinion });
  };

  useEffect(() => {
    if (isSuccess) {
      showModal();
    }
  }, [isSuccess]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FullScreenContainer centeredItems>
      <HeaderWithInformation
        title="Wystaw Opinię"
        information="Wystaw opinię za przejazd z danym kierowcą i podziel się swoimi wrażeniami dotyczącymi podróży."
        containerStyle={{ marginBottom: 40 }}
      />
      <AddStarsComponent
        setCurrentStarsNum={setStars}
        currentStarsNum={stars}
      />
      <FormProvider {...methods}>
        <FormInput
          name="opinion"
          label="Opinia dla kierowcy"
          onBlur={() => trigger("opinion")}
          multiline
          numberOfLines={6}
        />
      </FormProvider>
      <BottomContainer style={{ marginBottom: 40 }}>
        <Button mode="contained" onPress={handleSubmit(onSubmitHandler)}>
          Dodaj opinię
        </Button>
      </BottomContainer>
      {Modal}
    </FullScreenContainer>
  );
};
