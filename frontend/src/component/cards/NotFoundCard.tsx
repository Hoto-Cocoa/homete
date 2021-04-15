import React from "react";
import { Card } from "semantic-ui-react";

const NotFoundCard: React.FC = () => {
  return (
    <Card fluid color="blue">
      <Card.Content>
        <Card.Header as="h1">Not Found</Card.Header>
        <Card.Description>해당 페이지를 찾을 수 없어요!</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default React.memo(NotFoundCard);
