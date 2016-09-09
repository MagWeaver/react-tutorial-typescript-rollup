import typescript from 'rollup-plugin-typescript';
import babel   from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

export default {
	entry: './public/src/index.tsx',
	dest: './public/dist/app.min.js',
	format: 'iife',
	sourceMap: './public/dist/app.min.js.map',
	moduleName: 'MyBundle',
	plugins: [
		typescript(),

		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		babel(),
		//eslint(), //Commenting out for now. Need to figure out how to get it to lay off the "__" vars, possibly switch to tslint
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
