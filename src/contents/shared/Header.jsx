import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const SharedHeader = () => {
    return (
        <Row>
            <Col className="12">
                <h1 className="h1">ACTLab Store</h1>
            </Col>
        </Row>
    );
}

export default SharedHeader;