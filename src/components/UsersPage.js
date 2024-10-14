import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersPage.css'; // Pour les styles personnalisés supplémentaires


class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      users: [
        { id: 1, name: 'Selena Roy', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 100, status: 'Terminé' },
        { id: 2, name: 'Emma Watson', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 57, status: 'En cours' },
        { id: 3, name: 'Jhon Robert', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 100, status: 'Terminé' },
        { id: 4, name: 'Anne Hathaway', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 50, status: 'En cours' },
      ]
    };
  }

  toggleAddForm = () => {
    this.setState(prevState => ({ showAddForm: !prevState.showAddForm }));
  }

  addUser = (newUser) => {
    this.setState(prevState => ({
      users: [...prevState.users, { ...newUser, id: prevState.users.length + 1 }],
      showAddForm: false
    }));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Utilisateurs</h1>
        </div>
        <div className="row mb-3">
          <UserCard title="Membres Actif" count={94} color="bg-success" />
          <UserCard title="Membres Bloqués" count={6} color="bg-danger" />
          <UserCard title="Total Effectif" count={100} color="bg-primary" />
        </div>
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Liste des membres</h5>
            <button className="btn btn-primary" onClick={this.toggleAddForm}>
              Ajouter
            </button>
          </div>
          <div className="card-body">
            <UserTable users={this.state.users} />
          </div>
        </div>
        {this.state.showAddForm && 
          <AddUserForm onAdd={this.addUser} onClose={this.toggleAddForm} />
        }
      </div>
    );
  }
}

class UserCard extends Component {
  render() {
    const { title, count, color } = this.props;
    return (
      <div className="col-md-4 mb-4">
        <div className={`card ${color} text-white`}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{count} Membres</p>
          </div>
        </div>
      </div>
    );
  }
}

class UserTable extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Membres</th>
            <th>Date début</th>
            <th>Seuil</th>
            <th>Progression</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.startDate}</td>
              <td>{user.threshold}</td>
              <td>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${user.progress}%`}} 
                    aria-valuenow={user.progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                    {user.progress}%
                  </div>
                </div>
              </td>
              <td>
                <span className={`badge ${user.status === 'Terminé' ? 'bg-success' : 'bg-warning'}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1">Voir</button>
                <button className="btn btn-sm btn-outline-secondary me-1">Modifier</button>
                <button className="btn btn-sm btn-outline-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstName: '',
      birthDate: '',
      profession: '',
      email: '',
      phone: '',
      address: '',
      organization: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state);
  }

  render() {
    return (
      <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un membre</h5>
              <button type="button" className="btn-close" onClick={this.props.onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="name" placeholder="Nom" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="firstName" placeholder="Prénom" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="date" className="form-control" name="birthDate" placeholder="Date de naissance" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="profession" placeholder="Profession" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name="email" placeholder="E-mail" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" name="phone" placeholder="Téléphone" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="address" placeholder="Adresse" onChange={this.handleChange} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="organization" placeholder="Organisation" onChange={this.handleChange} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Annuler</button>
                  <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersPage;
