import { Container, Row, Col } from "reactstrap";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";

export default function Home() {
  return (
    <Container fluid className="pt-3">
      <Row>
        {/* Feed */}
        <Col lg="1" md="1" xs="12">
        </Col>
        {/* Feed */}
        <Col lg="7" md="7" xs="12">
          <Feed />
        </Col>

        {/* Right Sidebar */}
        <Col lg="4" className="d-none d-lg-block">
          <Rightbar />
        </Col>
      </Row>
    </Container>
  );
}