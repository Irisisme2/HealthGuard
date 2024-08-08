import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Heading, Text, Input, Stack, Spinner, Button, List, ListItem, IconButton, Collapse, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Card from 'components/card/Card'; // Adjust import according to your setup
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'; // Import icons for toggle

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '150%',
  height: '155%'
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
      setLocations(response.data.results);
    } catch (error) {
      console.error('Error fetching locations:', error);
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

            const infoWindow = new google.maps.InfoWindow({
              content: `<div><strong>${place.name}</strong><br>${place.vicinity}<br><button id="details-btn-${place.place_id}" onclick="showDetails('${place.place_id}')">Details</button></div>`,
              position: place.geometry.location // Make sure the InfoWindow has a position
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
              setSelectedLocation(place);
            });

            updatedLocations.push({
              ...place,
              marker,
              infoWindow
            });
          });
          setLocations(updatedLocations);
        } else {
          console.error('Places API request failed:', status);
        }
      });
    }
  }, [googleLoaded, mapCenter]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleCloseClick = () => {
    setSelectedLocation(null);
  };

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
      }
    }
  };

  const handleListItemClick = (location) => {
    setMapCenter({
      lat: location.geometry.location.lat,
      lng: location.geometry.location.lng
    });
    setSelectedLocation(location);
  };

  const handleViewDetails = (location) => {
    setDetailsLocation(location);
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
      <Stack direction="row" spacing={4} height="500px">
        <Box
          width={isListOpen ? "40%" : "0%"}
          height="100%"
          overflowY="auto"
          transition="width 0.3s"
          position="relative"
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
        <Box width={isListOpen ? "60%" : "100%"} height="100%" position="relative">
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
                    lat: location.geometry.location.lat,
                    lng: location.geometry.location.lng,
                  }}
                  onClick={() => handleMarkerClick(location)}
                />
              ))}
              {selectedLocation && (
                <InfoWindow
                  position={{
                    lat: selectedLocation.geometry.location.lat,
                    lng: selectedLocation.geometry.location.lng,
                  }}
                  onCloseClick={handleCloseClick}
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
            {/* Add more details if available */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default InteractiveMap;
