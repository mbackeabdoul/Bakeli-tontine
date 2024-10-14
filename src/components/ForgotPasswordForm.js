import React, { useState } from 'react';
import './ForgotPassword.css'; 
import forgot from '../images/forgot.jpg';


function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true); 
  };

  const handleCloseModal = () => {
    setIsSubmitted(false); 
  };

  const maskEmail = (email) => {
    const emailParts = email.split('@');
    const maskedLocal = emailParts[0].substring(0, 2) + '****';
    return maskedLocal + '@' + emailParts[1];
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="illustration">
      <img
              src={forgot}
              alt="Illustration"
              className="img-fluid rounded-top-right"
            />
      </div>

      <div className="col-6 formulaire">
        <h2>Mot de passe oublier</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Pour réinitialiser votre mot de passe entrez votre <br/>e-mail ou votre numero de telephone.</label><br/>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrez votre e-mail ou Telephone"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <div className="text-end">
          <button type="submit" className="btn btn-success mt-3 w-25 text-center">Envoyer</button>
          </div>
        </form>
      </div>

      {isSubmitted && (
        <div className="modal d-flex justify-content-center align-items-center">
          <div className="card col-3 text-center">
            <div className="card-body">
              <p className="card-title">E-mail envoyé</p>
              <p className="card-text">Nous avons envoyé un e-mail à {maskEmail(email)} avec un lien pour réinitialiser votre mot de passe</p>
              <button className="btn btn-success w-100" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordForm;
