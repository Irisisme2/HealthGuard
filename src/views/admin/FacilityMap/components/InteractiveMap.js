import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Stack,
  Spinner,
  Button,
  List,
  ListItem,
  IconButton,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Card from 'components/card/Card'; // Adjust import according to your setup
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'; // Import icons for toggle

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 52.229676, // Default to Warsaw, Poland
  lng: 21.012229
};

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false); // List is initially hidden
  const [detailsLocation, setDetailsLocation] = useState(null); // For displaying details
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null); // Reference to the map

  const fetchLocations = useCallback(async (center) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=5000&type=hospital&key=${apiKey}`
      );
      const places = response.data.results;

      // Fetch detailed info for each place
      const detailsPromises = places.map(place => 
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`)
      );
      const detailsResponses = await Promise.all(detailsPromises);
      const detailedPlaces = detailsResponses.map(resp => resp.data.result);
      setLocations(detailedPlaces);
    } catch (error) {
      console.error('Error fetching locations:', error.response ? error.response.data : error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (googleLoaded && mapRef.current) {
      const map = mapRef.current;
      const google = window.google;
      if (!google) {
        console.error('Google Maps API is not loaded.');
        return;
      }

      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: mapCenter,
        radius: '5000',
        type: ['hospital']
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const updatedLocations = [];
          results.forEach(place => {
            const marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });

            marker.addListener('click', () => {
              setSelectedLocation({
                ...place,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              });
            });

            updatedLocations.push({
              ...place,
              marker
            });
          });
          setLocations(updatedLocations);
        } else {
          console.error('Places API request failed:', status);
        }
      });
    }
  }, [googleLoaded, mapCenter]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setMapCenter(newCenter);
        fetchLocations(newCenter);
      } else {
        console.error('No geometry found for the selected place.');
      }
    }
  };

  const handleListItemClick = (location) => {
    try {
      setMapCenter({
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      });
      setSelectedLocation(location);
    } catch (error) {
      console.error('Error handling list item click:', error);
    }
  };

  const handleViewDetails = (location) => {
    try {
      setDetailsLocation(location);
    } catch (error) {
      console.error('Error viewing details:', error);
    }
  };

  return (
    <Card p={0} borderRadius="lg" shadow="lg" bg="white" width="100%" height="100%">
      <Heading mb={4} fontSize="2xl" fontWeight="bold" textAlign="center">
        Interactive Map
      </Heading>
      <Text mb={4} textAlign="center" fontSize="md" color="gray.600">
        Discover hospitals around your selected location.
      </Text>
      <Stack direction="row" mb={4} spacing={4} justify="center">
        <LoadScript
          googleMapsApiKey={apiKey}
          libraries={['places']}
          onLoad={() => setGoogleLoaded(true)}
        >
          <Autocomplete
            onLoad={(autocomplete) => {
              setAutocomplete(autocomplete);
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Search location"
              width="300px"
            />
          </Autocomplete>
        </LoadScript>
        <Button colorScheme="teal" onClick={() => fetchLocations(mapCenter)}>
          Search Hospitals
        </Button>
      </Stack>
      <Stack direction="row" spacing={4} height="680px">
        <Box
          width={isListOpen ? "35%" : "0%"}
          height="100%"
          overflowY="auto"
          transition="width 0.3s"
          position="relative"
          borderWidth="1px"
          borderColor="gray.200"
          bg="gray.50"
        >
          <Collapse in={isListOpen}>
            <Box p={2}>
              <Heading fontSize="lg" mb={2} textAlign="center">Hospitals List</Heading>
              {loading ? (
                <Spinner size="xl" color="teal.500" />
              ) : (
                <List spacing={3}>
                  {locations.map((location) => (
                    <ListItem
                      key={location.place_id}
                      p={3}
                      borderWidth={1}
                      borderRadius="md"
                      cursor="pointer"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={() => handleListItemClick(location)}
                    >
                      <Box>
                        <Heading fontSize="md">{location.name}</Heading>
                        <Text>{location.vicinity || location.formatted_address}</Text>
                      </Box>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleViewDetails(location)}
                      >
                        View Details
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Collapse>
        </Box>
        <Box width={isListOpen ? "65%" : "100%"} height="100%" position="relative">
          {googleLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={14}
              onLoad={(map) => mapRef.current = map}
            >
              {locations.map((location) => (
                <Marker
                  key={location.place_id}
                  position={{
                    lat: location.geometry.location.lat(),
                    lng: location.geometry.location.lng(),
                  }}
                  onClick={() => setSelectedLocation({
                    ...location,
                    lat: location.geometry.location.lat(),
                    lng: location.geometry.location.lng()
                  })}
                />
              ))}
              {selectedLocation && (
                <InfoWindow
                  position={{
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                  }}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <Box>
                    <Heading fontSize="lg">{selectedLocation.name}</Heading>
                    <Text>{selectedLocation.vicinity || selectedLocation.formatted_address}</Text>
                    <Button
                      mt={2}
                      colorScheme="blue"
                      onClick={() => handleViewDetails(selectedLocation)}
                    >
                      Details
                    </Button>
                  </Box>
                </InfoWindow>
              )}
              <IconButton
                aria-label="Toggle List"
                icon={isListOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                onClick={() => setIsListOpen(!isListOpen)}
                position="absolute"
                top="10px"
                right="10px"
                zIndex="1"
                backgroundColor="gray.300"
                _hover={{ backgroundColor: "gray.400" }}
              />
            </GoogleMap>
          )}
        </Box>
      </Stack>

      {/* Details Modal */}
      <Modal isOpen={!!detailsLocation} onClose={() => setDetailsLocation(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{detailsLocation?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text><strong>Address:</strong> {detailsLocation?.vicinity || detailsLocation?.formatted_address}</Text>
            <Text><strong>Phone:</strong> {detailsLocation?.formatted_phone_number || 'N/A'}</Text>
            <Text><strong>Opening Hours:</strong> {detailsLocation?.opening_hours?.weekday_text?.join(', ') || 'N/A'}</Text>
            <Text><strong>Google Maps Link:</strong> <a href={`https://www.google.com/maps/place/?q=place_id:${detailsLocation?.place_id}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a></Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default InteractiveMap;

