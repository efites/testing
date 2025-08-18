module.exports = {
	default: {
		require: [
			'support/world.js',
			'support/hooks.js',
			'features/steps/**/*.js'
		],
		formatOptions: {
			snippetInterface: 'synchronous'
		},
		publishQuiet: true
	}
};


