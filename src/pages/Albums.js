import { useContext, useEffect, useState } from "react";
import { SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

import ImageCard from '../components/ImageCard';
import GPhotoServiceContext from '../components/GPhotoServiceContext';
import Loading from "./Loading";

function Albums() {
  const navigate = useNavigate();
	const service = useContext(GPhotoServiceContext);
	const [albums, setAlbums] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
    function () {
      const promise = service.loadAlbums();
      promise.then(function (arg) {
        setAlbums(arg);
        setIsLoading(false);
      });
    },
    [service]
  );

	return (
		<div>
      {isLoading && <Loading/>}
      {albums.length > 0 && (
        <SimpleGrid columns={3} spacing={5}>
          {
            albums.map(item => {
              return <ImageCard key={item.id} src={item.coverPhotoBaseUrl} title={item.title} id={item.id} onClick={() => navigate('/album/' + item.id)}></ImageCard>
            }
          )}
        </SimpleGrid>
      )}
    </div>
	);
}

export default Albums;
