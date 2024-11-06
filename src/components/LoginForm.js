import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importer Link et useNavigate
import image1 from '../images/image1.png';
import './LoginForm.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

function LoginPage() {
  const navigate = useNavigate(); // Initialiser useNavigate
  // États pour gérer les valeurs des champs
  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // Gestion de la soumission du formulaire
  const handleConnexion = (e) => {
    e.preventDefault();

    // Redirection vers la page du tableau de bord si le formulaire est rempli
    if (telephone.trim() !== '' && motDePasse.trim() !== '') {
      navigate('/dashboard'); // Utiliser navigate pour rediriger
    }
  };

  return (
    <div className="container">
      <div className="section-gauche">
        <img src={image1} alt="Illustration" style={{ width: '80%', height: 'auto' }} />
      </div>

      <div className="section-droite">
        <h1>Bienvenue sur Bakéli-tontine</h1>
        <p>Connectez-vous et gérez vos cotisations</p>

        <input
          type="text"
          placeholder="N° téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="input-field"
        />

        <Link to="/forgot-password" className="forgot-password-link">Mot de passe oublié?</Link>

        <button className="btn-connexion" onClick={handleConnexion}>Connexion</button>
        
        <p>
          Vous n’avez pas de compte? <Link to="/signup" className="signup-link">Inscrivez-vous!</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
