import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import profil from '../images/profil.jpg';


const Settings = () => {
  return (
    <Container fluid>
      <h1 className="mb-4">Paramètres</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img
                src={profil}
                alt="Ndiaga Sall"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h3>Ndiaga Sall</h3>
              <p className="text-muted">Admin</p>
              <Button variant="primary">Editer profil</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Informations Générales</h5>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Prénom</strong>
                </Col>
                <Col sm={9}>Ndiaga</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Nom</strong>
                </Col>
                <Col sm={9}>Sall</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Statut</strong>
                </Col>
                <Col sm={9}>Administrateur</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>E-mail</strong>
                </Col>
                <Col sm={9}>ndiaga@gmail.com</Col>
              </Row>
              <h5 className="mt-5 mb-4">Statistiques</h5>
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Nombre de membres ajoutés</strong>
                </Col>
                <Col sm={6}>25</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Nombre de membres archivés</strong>
                </Col>
                <Col sm={6}>10</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Nombre de membres bloqués</strong>
                </Col>
                <Col sm={6}>4</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;