import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../hook/UserContext';
import { exchangeAuthorizationCode, fetchAndSetUserData } from '../services/ApiSpotify';

export default function SpotifyCallback() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext); // Récupère le contexte utilisateur
    const [isExchanging, setIsExchanging] = useState(false);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        if (!userContext) {
            console.error('UserContext is undefined');
            return;
        }

        const { setUser } = userContext;

        if (code && !isExchanging) {
            setIsExchanging(true);  // Empêcher un autre échange de code
            exchangeAuthorizationCode(code)
                .then(data => {
                    localStorage.setItem('spotifyAccessToken', data.accessToken);
                    localStorage.setItem('spotifyRefreshToken', data.refreshToken);
                    fetchAndSetUserData(setUser)
                        .then(() => {
                            setIsExchanging(false);  // Réinitialiser après la réussite
                            navigate('/');
                        });
                })
                .catch(error => {
                    console.error('Failed to exchange authorization code:', error);
                    alert('Failed to authenticate with Spotify. Please try again.');
                    setIsExchanging(false);  // Réinitialiser après une erreur
                });
        } else if (!code) {
            console.error('No authorization code found in URL.');
        }

    }, [navigate, userContext, isExchanging]);

    return <div>Processing Spotify authentication...</div>;
}