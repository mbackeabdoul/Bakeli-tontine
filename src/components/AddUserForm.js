import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SignUpForm.css'; // Ajoutez le style de votre formulaire d'inscription ici

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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un membre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label text-start d-block">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Nom"
                  value={newUser.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label text-start d-block">Date de début</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={newUser.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label text-start d-block">Seuil</label>
                <input
                  type="text"
                  className="form-control"
                  name="threshold"
                  placeholder="Seuil"
                  value={newUser.threshold}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label text-start d-block">Progression</label>
                <input
                  type="number"
                  className="form-control"
                  name="progress"
                  placeholder="Progression"
                  value={newUser.progress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="form-label text-start d-block">Statut</label>
            <select
              className="form-control"
              name="status"
              value={newUser.status}
              onChange={handleChange}
              required
            >
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>

          <div className="text-center">
            <Button variant="success" type="submit" className="btn btn-block">
              Ajouter
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserForm;
