export default {
	get: {
		general: () => ({
			displayFavorite: localStorage.getItem("NT-displayFavorite") || "true",
		}),
		clock: () => ({
			enabled: localStorage.getItem("NT-clockEnabled") || "true",
			format: "24h",
		}),
		weather: () => ({
			enabled: localStorage.getItem("NT-weatherEnabled") || "false",
			apiKey: localStorage.getItem("NT-weatherApiKey") || "",
			cityId: localStorage.getItem("NT-weatherCityId") || "",
			unit: localStorage.getItem("NT-weatherUnit") || "true",
			lastUpdate: localStorage.getItem("NT-weatherLastUpdate") || "0",
			cahce: localStorage.getItem("NT-weatherCahce") || "{}",
		}),
		spotify: () => ({
			enabled: localStorage.getItem("NT-spotifyEnabled") || "false",
			clientID: localStorage.getItem("NT-spotifyClientID") || "",
			clientSecret: localStorage.getItem("NT-spotifyClientSecret") || "",
			redirectUrl: localStorage.getItem("NT-spotifyRedirectUrl") || "",
			accessToken: localStorage.getItem("NT-spotifyAccessToken") || "",
			accessTokenTime: localStorage.getItem("NT-spotifyAccessTokenTime") || "",
			refreshToken: localStorage.getItem("NT-spotifyRefreshToken") || "",
		}),
	},
	set: {
		general: {
			displayFavorite: (value) => {
				localStorage.setItem("NT-displayFavorite", value);
			},
		},
		clock: {
			enabled: (value) => {
				localStorage.setItem("NT-clockEnabled", value);
			},
			format: (value) => {
				localStorage.setItem("NT-clockFormat", value);
			},
		},
		weather: {
			enabled: (value) => {
				localStorage.setItem("NT-weatherEnabled", value);
			},
			apiKey: (value) => {
				localStorage.removeItem("NT-weatherLastUpdate");
				localStorage.setItem("NT-weatherApiKey", value);
			},
			cityId: (value) => {
				localStorage.removeItem("NT-weatherLastUpdate");
				localStorage.setItem("NT-weatherCityId", value);
			},
			unit: (value) => {
				localStorage.removeItem("NT-weatherLastUpdate");
				localStorage.setItem("NT-weatherUnit", value);
			},
			lastUpdate: (value) => {
				localStorage.setItem("NT-weatherLastUpdate", value);
			},
			cahce: (value) => {
				localStorage.setItem("NT-weatherCahce", value);
			},
		},
		spotify: {
			enabled: (value) => {
				localStorage.setItem("NT-spotifyEnabled", value);
			},
			clientID: (value) => {
				localStorage.setItem("NT-spotifyClientID", value);
			},
			clientSecret: (value) => {
				localStorage.setItem("NT-spotifyClientSecret", value);
			},
			redirectUrl: (value) => {
				localStorage.setItem("NT-spotifyRedirectUrl", value);
			},
			accessToken: (value) => {
				localStorage.setItem("NT-spotifyAccessToken", value);
			},
			refreshToken: (value) => {
				localStorage.setItem("NT-spotifyRefreshToken", value);
			},
			accessTokenTime: (value) => {
				localStorage.setItem("NT-spotifyAccessTokenTime", value);
			},
		},
	},
};
