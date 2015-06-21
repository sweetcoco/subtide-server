/**
 * Handles a call to /assets/{param*}
 */
exports.assets = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: {
		directory: {
			path: './dist/assets'
		}
	}
};

/**
 * Handles a call to /fonts/{param*}
 */
exports.fonts = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: {
		directory: {
			path: './dist/fonts'
		}
	}
};
