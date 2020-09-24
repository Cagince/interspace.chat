import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import FloatingRoomWindow from './components/FloatingRoomWindow';
import RootContextProvider from './contexts/RootContext';

import TravisoGameWrapper from './traviso/TravisoGameWrapper';
import { theme } from './utils/theme';

function App() {
	return (
		<div className='App'>
			<ThemeProvider theme={theme}>

			{/* <div className='stars'></div>
			<div className='twinkling'></div>

			<StarfieldAnimation
				numParticles={300}
				lineWidth={2.0}
				depth={300}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
				}}
			/> */}

				<RootContextProvider>
					<TravisoGameWrapper />
					<FloatingRoomWindow />
				</RootContextProvider>
			</ThemeProvider>
		</div>
	);
}


export default App;
