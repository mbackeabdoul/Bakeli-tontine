import React, { Component } from 'react';
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
      message: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ message: 'Inscription réussie ! Vous pouvez vous connecter.' }, () => {
      setTimeout(() => {
        this.props.navigate('/login');
      }, 2000);
    });
  };

  render() {
    return (
      <div className="flex h-screen">
        {/* Partie gauche avec l'image */}
        {/* <div className="hidden md:flex md:w-1/2 bg-cover bg-center rounded-tr-lg" style={{ backgroundImage: `url(${image2})` }}></div> */}
        <div className="section-gauche">
        <img src={image2} alt="Illustration" style={{ width: '50%', height: 'auto' }} />
      </div>


        {/* Partie droite pour le formulaire */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
          {this.state.message && (
            <div className="mb-4 text-green-600 text-center">{this.state.message}</div>
          )}
          <form className="w-full" onSubmit={this.handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-4">Inscription</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['nom', 'prenom', 'dateNaissance', 'profession', 'motDePasse', 'confirmerMotDePasse', 'email', 'telephone', 'adresse', 'organisation'].map((field, index) => (
                <div key={index} className="form-group mb-3">
                  <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                  <input 
                    type={field.includes('motDePasse') ? 'password' : field.includes('date') ? 'date' : 'text'} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500" 
                    name={field} 
                    value={this.state[field]} 
                    onChange={this.handleChange} 
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">S'inscrire</button>
            </div>

            <div className="text-center mt-3">
              <p>Vous avez déjà un compte? <Link to="/login" className="text-green-600 hover:underline">Connectez-vous</Link></p>
            </div>
          </form>
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
