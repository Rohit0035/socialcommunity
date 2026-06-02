import AdvancedEditor from "@/components/reelscomponent/AdvancedEditor copy";
import { Container, Row, Col } from "reactstrap";

export default function ReelCreate() {
  return (
    <Container fluid className="pt-3">
      <Row>
         <Col md="12" className="mx-auto">
            <AdvancedEditor/>
         </Col>
      </Row>
    </Container>
  );
}