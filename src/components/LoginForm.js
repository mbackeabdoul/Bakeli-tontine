import React, { Component } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../images/image1.png';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telephone: '',
            password: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.navigate('/dashboard');
    };

    render() {
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src={image1} 
                            alt="Illustration"
                            className="img-fluid rounded-top-right"
                        />
                    </div>

                    <div className="col-md-6">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <h1 className="text-center">Bienvenue sur Bakéli-tontine</h1>
                            <h2 className="text-center mb-4">Connectez-vous</h2>
                            <p className="text-center text-muted">Connectez-vous et gérez vos cotisations</p>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="telephone"
                                    name="telephone"
                                    className="form-control custom-input"
                                    placeholder="N° téléphone"
                                    value={this.state.telephone}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className="form-group mt-4 text-white">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control custom-input"
                                    placeholder="Mot de passe"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className="form-group text-center mt-2">
                                <Link to="/forgot-password" className="text-muted custom-link">Mot de passe oublié?</Link>
                            </div>

                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-success">Connexion</button>
                            </div>

                            <div className="text-center mt-3">
                                <p>Vous n'avez pas de compte? <Link to="/signup">Inscrivez-vous</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const LoginFormWithNavigate = () => {
    const navigate = useNavigate();
    return <LoginForm navigate={navigate} />;
};

export default LoginFormWithNavigate;
