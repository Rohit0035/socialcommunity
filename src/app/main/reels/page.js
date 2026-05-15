import ReelsList from "@/components/reelscomponent/ReelsList";
import { Container, Row, Col } from "reactstrap";

export default function Reel() {
  return (
    <Container fluid className="pt-3">
      <Row>
        <Col lg="4" md="2" xs="12">
        </Col>
        <Col lg="4" md="8" xs="12" data-aos="zoom-in" >
          <ReelsList/>
        </Col>
        <Col lg="4" md="2" xs="12">
        </Col>
      </Row>
    </Container>
  );
}