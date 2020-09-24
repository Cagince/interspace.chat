import React from 'react';
import './App.css';
import FloatingRoomWindow from './components/FloatingRoomWindow';
import RootContextProvider from './contexts/RootContext';

import TravisoGameWrapper from './traviso/TravisoGameWrapper';

function App() {
	return (
		<div className='App'>
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
		</div>
	);
}


export default App;
