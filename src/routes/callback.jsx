import React, { useEffect } from 'react'
import config from '../utils/UserConfig';

function Callback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (code) {
            fetch("https://accounts.spotify.com/api/token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    client_id: config.get.spotify().clientID,
                    client_secret: config.get.spotify().clientSecret,
                    redirect_uri: config.get.spotify().redirectUrl
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.access_token) {
                        config.set.spotify.accessToken(data.access_token);
                        config.set.spotify.accessTokenTime(Date.now());
                        config.set.spotify.refreshToken(data.refresh_token);
                        window.close();
                    }
                });
        }
    }, [code]);
    return (
        <div>
            <h1>Code: {code}</h1>
        </div>
    )
}

export default Callback