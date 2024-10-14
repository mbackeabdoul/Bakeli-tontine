import React, { Component } from 'react';
import './SignUpForm.css';
import { Link, useNavigate } from 'react-router-dom';
import image2 from '../images/image2.avif';


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: '',
      prenom: '',
      dateNaissance: '',
      profession: '',
      motDePasse: '',
      confirmerMotDePasse: '',
      email: '',
      telephone: '',
      adresse: '',
      organisation: '',
      message: '', // Pour le message de succès
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    // Logique d'inscription ici (par exemple, appeler une API)
    
    // Simule l'inscription réussie
    this.setState({ message: 'Inscription réussie ! Vous pouvez vous connecter.' }, () => {
      // Redirection après 2 secondes
      setTimeout(() => {
        this.props.navigate('/login'); // Redirection vers la page de connexion
      }, 2000);
    });
  };

  render() {
    return (
      <div className="container my-2">
        <div className="row">
          <div className="col-md-5 d-none d-md-block">
            <img src={image2} alt="Illustration" className="img-fluid rounded-top-right" />
          </div>

          <div className="col-md-7">
            {this.state.message && (
              <div className="alert alert-success text-center">
                {this.state.message}
              </div>
            )}
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
              <h2 className="text-center mb-4">Inscription</h2>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Nom</label>
                    <input type="text" className="form-control" name="nom" value={this.state.nom} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Prénom</label>
                    <input type="text" className="form-control" name="prenom" value={this.state.prenom} onChange={this.handleChange} />
                  </div>
                </div> 
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Date de naissance</label>
                    <input type="date" className="form-control" name="dateNaissance" value={this.state.dateNaissance} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Profession</label>
                    <input type="text" className="form-control" name="profession" value={this.state.profession} onChange={this.handleChange} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Définir mot de passe</label>
                    <input type="password" className="form-control" name="motDePasse" value={this.state.motDePasse} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Confirmer votre mot de passe</label>
                    <input type="password" className="form-control" name="confirmerMotDePasse" value={this.state.confirmerMotDePasse} onChange={this.handleChange} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">E-mail</label>
                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Téléphone</label>
                    <input type="text" className="form-control" name="telephone" value={this.state.telephone} onChange={this.handleChange} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Adresse</label>
                    <input type="text" className="form-control" name="adresse" value={this.state.adresse} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-start d-block">Organisation</label>
                    <input type="text" className="form-control" name="organisation" value={this.state.organisation} onChange={this.handleChange} />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success btn-block text-center">S'inscrire</button>
              </div>
              <div className="text-center mt-3">
                <p>Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Encapsulez votre composant avec useNavigate
const SignUpFormWithNavigate = () => {
  const navigate = useNavigate();
  return <SignUpForm navigate={navigate} />;
};

export default SignUpFormWithNavigate;
