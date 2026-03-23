import { Card, CardBody, Button, Row, Col } from "reactstrap";

const users = [
  { id: 1, name: "Pankaj Goyal", followers: "157K" },
  { id: 2, name: "Shitala Prasad Prajapati", followers: "101K" },
  { id: 3, name: "All Texter", followers: "63K" },
];

export default function SuggestionsList() {
  return (
    <div className="fb-suggestions-wrapper">
      <h5 className="fb-section-title">People you may know</h5>

      <Row>
        {users.map((user) => (
          <Col xs="12" sm="6" lg="4" key={user.id}>
            <Card className="fb-friend-card">
              <div className="fb-img-placeholder"></div>
              <CardBody>
                <h6>{user.name}</h6>
                <p className="fb-followers-text">
                  Followed by {user.followers}
                </p>

                <Button color="primary" block>
                  Add friend
                </Button>

                <Button color="light" block className="mt-2">
                  Remove
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}