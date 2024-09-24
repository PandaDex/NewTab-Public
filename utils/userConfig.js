export default {
	get: {
		general: () => ({
			displayFavorite: process.client ? localStorage.getItem("NT-displayFavorite") || "true" : "true",
		}),
		clock: () => ({
			enabled: process.client ? localStorage.getItem("NT-clockEnabled") || "true" : "true",
			format: "24h",
		}),
		weather: () => ({
			enabled: process.client ? localStorage.getItem("NT-weatherEnabled") || "false" : "false",
			apiKey: process.client ? localStorage.getItem("NT-weatherApiKey") || "" : "",
			cityId: process.client ? localStorage.getItem("NT-weatherCityId") || "" : "",
			unit: process.client ? localStorage.getItem("NT-weatherUnit") || "true" : "true",
			lastUpdate: process.client ? localStorage.getItem("NT-weatherLastUpdate") || "0" : "0",
			cahce: process.client ? localStorage.getItem("NT-weatherCahce") || "{}" : "{}",
		}),
		spotify: () => ({
			enabled: process.client ? localStorage.getItem("NT-spotifyEnabled") || "false" : "false",
			clientID: process.client ? localStorage.getItem("NT-spotifyClientID") || "" : "",
			clientSecret: process.client ? localStorage.getItem("NT-spotifyClientSecret") || "" : "",
			redirectUrl: process.client ? localStorage.getItem("NT-spotifyRedirectUrl") || "" : "",
			accessToken: process.client ? localStorage.getItem("NT-spotifyAccessToken") || "" : "",
			accessTokenTime: process.client ? localStorage.getItem("NT-spotifyAccessTokenTime") || "" : "",
			refreshToken: process.client ? localStorage.getItem("NT-spotifyRefreshToken") || "" : "",
		}),
		customSearch: () => ({
			enabled: process.client ? localStorage.getItem("NT-customSearchEnabled") || "false" : "false",
			array: process.client ? localStorage.getItem("NT-customSearchArray") || "[]" : "[]",
		}),
	},
	set: {
		general: {
			displayFavorite: (value) => {
				if (process.client) {
					localStorage.setItem("NT-displayFavorite", value);
				}
			},
		},
		clock: {
			enabled: (value) => {
				if (process.client) {
					localStorage.setItem("NT-clockEnabled", value);
				}
			},
			format: (value) => {
				if (process.client) {
					localStorage.setItem("NT-clockFormat", value);
				}
			},
		},
		weather: {
			enabled: (value) => {
				if (process.client) {
					localStorage.setItem("NT-weatherEnabled", value);
				}
			},
			apiKey: (value) => {
				if (process.client) {
					localStorage.removeItem("NT-weatherLastUpdate");
					localStorage.setItem("NT-weatherApiKey", value);
				}
			},
			cityId: (value) => {
				if (process.client) {
					localStorage.removeItem("NT-weatherLastUpdate");
					localStorage.setItem("NT-weatherCityId", value);
				}
			},
			unit: (value) => {
				if (process.client) {
					localStorage.removeItem("NT-weatherLastUpdate");
					localStorage.setItem("NT-weatherUnit", value);
				}
			},
			lastUpdate: (value) => {
				if (process.client) {
					localStorage.setItem("NT-weatherLastUpdate", value);
				}
			},
			cahce: (value) => {
				if (process.client) {
					localStorage.setItem("NT-weatherCahce", value);
				}
			},
		},
		spotify: {
			enabled: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyEnabled", value);
				}
			},
			clientID: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyClientID", value);
				}
			},
			clientSecret: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyClientSecret", value);
				}
			},
			redirectUrl: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyRedirectUrl", value);
				}
			},
			accessToken: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyAccessToken", value);
				}
			},
			refreshToken: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyRefreshToken", value);
				}
			},
			accessTokenTime: (value) => {
				if (process.client) {
					localStorage.setItem("NT-spotifyAccessTokenTime", value);
				}
			},
		},
		customSearch: {
			enabled: (value) => {
				if (process.client) {
					localStorage.setItem("NT-customSearchEnabled", value);
				}
			},
			array: (value) => {
				if (process.client) {
					localStorage.setItem("NT-customSearchArray", value);
				}
			},
		},
	},
	export: () => {
		if (process.client) {
			const raw = Object.fromEntries(
				Object.entries(localStorage).map(([key, value]) => [key, value]),
			);

			const file = new Blob([JSON.stringify(raw)], { type: "application/json" });
			const element = document.createElement("a");
			element.href = URL.createObjectURL(file);
			element.download = "settings.json";
			element.style.display = "none";
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		}
	},
	import: () => {
		if (process.client) {
			const file = document.createElement("input");
			file.type = "file";
			file.accept = "application/json";
			file.onchange = (e) => {
				const file = e.target.files[0];
				const reader = new FileReader();
				reader.readAsText(file);
				reader.onload = () => {
					const json = JSON.parse(reader.result);
					Object.entries(json).forEach(([key, value]) => {
						localStorage.setItem(key, value);
					});
				};
			};
			file.click();
		}
	},
};


