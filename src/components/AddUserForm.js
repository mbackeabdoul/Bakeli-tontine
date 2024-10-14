import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUserForm = ({ show, onHide, onAdd }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    startDate: '',
    threshold: '',
    progress: 0,
    status: 'En cours'
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newUser);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un membre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="name" placeholder="Nom" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="date" name="startDate" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="threshold" placeholder="Seuil" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="number" name="progress" placeholder="Progression" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select name="status" onChange={handleChange} required>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserForm;