import {Routes, Route} from 'react-router-dom'
import { gapi } from 'gapi-script';
import { config } from './config';
import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Albums from './pages/Albums';
import Home from './pages/Home';
import ViewAlbum from './pages/ViewAlbum';
import GPhotoServiceContext from './components/GPhotoServiceContext';
import GooglePhotosService from './service/GooglePhotoService';

const SCOPE = 'https://www.googleapis.com/auth/photoslibrary';

function App() {
  const [isInitialising, setIsInitialising] = useState(true);
  const [isAuthorised,   setIsAuthorised]   = useState(false);
  const [photoService,   setPhotoService]   = useState(undefined);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!window.gapi) {
        return;
      }

      clearInterval(intervalId);
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            discoveryDocs: [
              'https://photoslibrary.googleapis.com/$discovery/rest?version=v1',
            ],
            clientId: config.clientId,
            scope: SCOPE,
          })
          .then(function () {
            setIsInitialising(false);

            const auth = gapi.auth2.getAuthInstance();
            auth.isSignedIn.listen(() => {
              setIsAuthorised(user.hasGrantedScopes(SCOPE));
            });

            const user = auth.currentUser.get();
            const startAuth = user.hasGrantedScopes(SCOPE);
            setPhotoService(new GooglePhotosService(gapi.client));
            setIsAuthorised(startAuth);
          });
      });
    }, 100);
  }, [isInitialising, isAuthorised]);

  if (isInitialising) {
    return <Loading/>
  }

  if (!isAuthorised) {
    return <Login/>
  }

  return (
    <div className="app">
			<NavBar/>
      <GPhotoServiceContext.Provider value={photoService}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/photos' element={<Albums/>}/>
          <Route path='/album/:id' element={<ViewAlbum/>} />
        </Routes>
      </GPhotoServiceContext.Provider>
    </div>
  )
}

export default App;
