export default {
	get: {
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
		search: () => ({
			suggestionsEnabled:
				localStorage.getItem("NT-searchSuggestionsEnabled") || "false",
			suggestionsApiKey:
				localStorage.getItem("NT-searchSuggestionsApiKey") || "",
			suggestionsProvider:
				localStorage.getItem("NT-searchSuggestionsProvider") || "duckduckgo",
			displayFavorite: localStorage.getItem("NT-displayFavorite") || "true",
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
		search: {
			suggestionsEnabled: (value) => {
				localStorage.setItem("NT-searchSuggestionsEnabled", value);
			},
			suggestionsApiKey: (value) => {
				localStorage.setItem("NT-searchSuggestionsApiKey", value);
			},
			suggestionsProvider: (value) => {
				localStorage.setItem("NT-searchSuggestionsProvider", value);
			},
			displayFavorite: (value) => {
				localStorage.setItem("NT-displayFavorite", value);
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
	export: () => {
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
	},
	import: () => {
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
	},
};
