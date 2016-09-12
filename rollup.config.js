import typescript from 'rollup-plugin-typescript';
import babel   from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify';

export default {
	entry: './src/index.tsx',
	dest: './dist/app.min.js',
	format: 'iife',
	sourceMap: './dist/app.min.js.map',
	moduleName: 'MyBundle',
	plugins: [
		typescript(),

		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		babel(),
		(process.env.NODE_ENV === 'production' && uglify())
	],
	globals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'redux': 'Redux',
		'react-redux': 'reactRedux',
		'redux-thunk': 'ReduxThunk',
		'redux-logger': 'redux-logger',
		'jquery': 'jQuery'
	}
}
