import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                    <p className="text-center py-3">Copyright &copy; Accelx 2025</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer