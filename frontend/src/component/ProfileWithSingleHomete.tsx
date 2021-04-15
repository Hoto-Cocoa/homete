import React, { useMemo, useEffect } from "react";
import { Card, Header } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync as userFetchAsync } from "src/modules/user";
import { fetchOneAsync as hometesFetchOneAsync } from "src/modules/hometes";
import { RootState } from "src/modules";
import LoadingCard from "src/component/cards/LoadingCard";
import HometeCard from "src/component/cards/HometeCard";
import NotFoundCard from "src/component/cards/NotFoundCard";

const ProfileWithSingleHomete: React.FC = () => {
  const { username, docId }: { username: string; docId: string } = useParams();

  const loadingUser = useSelector(
    (state: RootState) => state.user.loading.FETCH,
  );
  const user = useSelector((state: RootState) => state.user.user);
  const loadingHomete = useSelector(
    (state: RootState) => state.hometes.loading.FETCH_ONE,
  );
  const homete = useSelector((state: RootState) => state.hometes.homete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userFetchAsync.request(username));
    dispatch(hometesFetchOneAsync.request(docId));
  }, [dispatch, username, docId]);

  return (
    <Card.Group centered>
      {loadingUser ? (
        <LoadingCard />
      ) : user ? (
        loadingHomete ? (
          <LoadingCard />
        ) : homete ? (
          <>
            <HometeCard {...homete} />
          </>
        ) : (
          <NotFoundCard />
        )
      ) : (
        <Card fluid color="blue">
          <Card.Content>
            <Card.Header as="h1">
              아직 서비스에 가입하지 않은 사용자예요!
            </Card.Header>
            <Card.Description>
              해당 사용자가 아직 서비스에 가입하지 않았어요.{" "}
              <Link to="/">메인 페이지</Link>에서 트위터 계정으로 로그인하기만
              하면 가입이 완료돼요.
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </Card.Group>
  );
};

export default ProfileWithSingleHomete;
