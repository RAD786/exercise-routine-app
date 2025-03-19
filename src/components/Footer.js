import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <Container>
                <Row className="align-items-center">
                    <Col md="6">
                        <NavLink to="/" className="text-light me-3">Home</NavLink>
                        <NavLink to="/create" className="text-light me-3">Create Routine</NavLink>
                        <NavLink to="/routines" className="text-light me-3">Routines</NavLink>
                        <NavLink to="/contact" className="text-light">Contact</NavLink>
                    </Col>

                    <Col md="6" className="text-md-end">
                        <small>&copy; {new Date().getFullYear()} Exercise Routine App. RAD786</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
