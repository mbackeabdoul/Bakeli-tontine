import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Settings from './Settings';

import profil from '../images/profil.jpg';


const Settings = () => {
  return (
    <Container fluid>
      <h1 className="mb-4">Paramètres</h1>
      <Card>
        <Card.Header>
          <h2>Paramètres Généraux</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="text-center mb-4">
                <img src={profil} alt="Ndiaga Sall" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                <h3>Ndiaga Sall</h3>
                <p className="text-muted">Admin</p>
                <Button variant="primary">Editer profil</Button>
              </div>
            </Col>
            <Col md={8}>
              <h4 className="mb-3">Informatios Générales</h4>
              <Row className="mb-3">
                <Col sm={4}><strong>Prénom</strong></Col>
                <Col sm={8}>Ndiaga</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>Nom</strong></Col>
                <Col sm={8}>Sall</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>Statut</strong></Col>
                <Col sm={8}>Administrateur</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>E-mail</strong></Col>
                <Col sm={8}>ndiaga@gmail.com</Col>
              </Row>
              <h4 className="mt-4 mb-3">Statistiques</h4>
              <Row className="mb-3">
                <Col sm={6}><strong>Nombre de membre ajoutés</strong></Col>
                <Col sm={6}>25</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}><strong>Nombre de membre archivés</strong></Col>
                <Col sm={6}>10</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}><strong>Nombre de membre bloqués</strong></Col>
                <Col sm={6}>4</Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;