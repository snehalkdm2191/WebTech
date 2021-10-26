import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth, Providers } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        Providers.signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            logging.info(result);
            history.push('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    function SignInWithSocialMedia() {
        if (error !== '') setError('');

        setAuthenticating(true);

        Providers.signInWithPopup(auth, Providers.google)
        .then(result => {
            logging.info(result);
            history.push('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    return (
        <div id="Login">
            <div className="form-group">
                <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </div>
            <div className="form-group">
                <input 
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </div>
            <button
                disabled={authenticating}
                color="success"
                onClick={() => signInWithEmailAndPassword()}
            >
                Login
            </button>
            <small>
                <p className='m-1 text-center'>Don't have an account? <Link to="/register">Register here.</Link></p>
                <p className='m-1 text-center'><Link to="/forget">Forget your password?</Link></p>
            </small>
            <ErrorText error={error} />
            <hr className="bg-info m-3" />
            <button
                disabled={authenticating}
                onClick={() => SignInWithSocialMedia()}
                style={{ backgroundColor:'#ea4335', borderColor: '#ea4335'}} 
            >
                <i className="fab fa-google mr-2"></i> Sign in with Google
            </button>
        </div>
    );
}

export default LoginPage;