import { FullScreenContainer } from "@/components/FullScreenContainer";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Title } from "@/components/Title";
import { AuthenticatedStackScreenProps } from "@/features/navigation/types/authenticatedStack";
import { useGetReceivedOpinionsByUserIdQuery } from "@/redux/api/opinionsApi";
import { NoOpinions } from "../components/NoOpinions";
import { OpinionsList } from "../components/OpinionsList";

export const OpinionsView = ({
  route: {
    params: { userId },
  },
}: AuthenticatedStackScreenProps<"Opinions">) => {
  const { data: receivedOpinions = [], isLoading } =
    useGetReceivedOpinionsByUserIdQuery({ userId });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FullScreenContainer centeredItems>
      {receivedOpinions.length === 0 ? (
        <NoOpinions title={"Nie otrzymałeś jeszcze żadnej opinii"} />
      ) : (
        <>
          <Title style={{ marginBottom: 40 }}>Opinie</Title>
          <OpinionsList opinions={receivedOpinions} areReceived={true} />
        </>
      )}
    </FullScreenContainer>
  );
};
