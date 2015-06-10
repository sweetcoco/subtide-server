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
