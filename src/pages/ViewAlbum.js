import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Loading from './Loading';
import GPhotoServiceContext from '../components/GPhotoServiceContext';
import ImageCard from '../components/ImageCard';

function ViewAlbum() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const navigate = useNavigate();
  const { id } = useParams();
  const service = useContext(GPhotoServiceContext);

  const [albumDetails, setAlbumDetails] = useState(undefined);
  const [isLoading, SetIsLoading] = useState(true);
  const [imageSelected, setImageSelected] = useState(null);

  // const [currentPageToken, setCurrentPageToken] = useState(undefined);
  // const [previousPageToken, setPreviousPageToken] = useState(undefined);

  useEffect(
    () => {
      const promise = service.loadAlbumDetail(id);
      promise.then(function (arg) {
        setAlbumDetails(arg);
        SetIsLoading(false);
      });
    }, [service, id]
  );

  return (
    <Box>
      {isLoading && <Loading/>}
      <Input id='fileInput' type={'file'} display={'none'} onChange={(event) => {
        console.log(event);
      }}/>
      <Button ml={5} mt={7} leftIcon={<ArrowBackIcon/>} colorScheme='teal' variant='outline' onClick={() => navigate('/photos')}> Back</Button>
      <Button ml={5} mt={7} leftIcon={<AddIcon/>} colorScheme='teal' variant='solid' onClick={() => {document.getElementById('fileInput').click()}}>Add</Button>
      {!isLoading && albumDetails && (
        <SimpleGrid columns={3} spacing={5}>
          {
            albumDetails.result.mediaItems.map(item => {
              return <ImageCard key={item.id} src={item.baseUrl} title={item.filename} onClick={onOpen}></ImageCard>
            })
          }
        </SimpleGrid>
      )}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              You can scroll the content behind the modal
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ViewAlbum;
