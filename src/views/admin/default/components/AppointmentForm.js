import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Image,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import doctor1 from 'assets/img/doctors/Doctor1.png';
import doctor2 from 'assets/img/doctors/Doctor2.png';
import doctor3 from 'assets/img/doctors/Doctor3.png';
import doctor4 from 'assets/img/doctors/Doctor4.png';
import doctor5 from 'assets/img/doctors/Doctor5.png';
import doctor6 from 'assets/img/doctors/Doctor6.png';

const specializations = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Internal Medicine',
  'Pediatrics',
  'Dermatology',
  'Gynecology',
];

const doctors = {
  Cardiology: [
    { name: 'Dr. John Smith', image: doctor1 },
    { name: 'Dr. Emily Johnson', image: doctor2 }
  ],
  Neurology: [
    { name: 'Dr. Michael Brown', image: doctor3 },
    { name: 'Dr. Sarah White', image: doctor4 }
  ],
  Orthopedics: [
    { name: 'Dr. James Miller', image: doctor5 },
    { name: 'Dr. Patricia Green', image: doctor6 }
  ],
  'Internal Medicine': [
    { name: 'Dr. Robert King', image: doctor1 },
    { name: 'Dr. Laura Black', image: doctor2 }
  ],
  Pediatrics: [
    { name: 'Dr. Linda Brown', image: doctor3 },
    { name: 'Dr. Gary White', image: doctor4 }
  ],
  Dermatology: [
    { name: 'Dr. Amy Williams', image: doctor5 },
    { name: 'Dr. Charles Hall', image: doctor6 }
  ],
  Gynecology: [
    { name: 'Dr. Nancy Wilson', image: doctor1 },
    { name: 'Dr. Paul Harris', image: doctor2 }
  ],
};

const availableTimes = {
  '2024-08-07': ['09:00 AM', '11:00 AM', '02:00 PM'],
  '2024-08-08': ['10:00 AM', '01:00 PM', '03:00 PM'],
  '2024-08-09': ['08:00 AM', '12:00 PM', '04:00 PM'],
};

const AppointmentForm = () => {
  const [specialization, setSpecialization] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctorImage, setDoctorImage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const toast = useToast();

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
    setDoctor('');
    setDoctorImage('');
  };

  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;
    setDoctor(selectedDoctor);
    const doctorDetails = doctors[specialization].find(doc => doc.name === selectedDoctor);
    setDoctorImage(doctorDetails ? doctorDetails.image : '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to API
    toast({
      title: 'Appointment Scheduled',
      description: 'Your appointment has been successfully scheduled.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Card p={6} borderRadius='lg' shadow='lg'>
      <VStack as="form" spacing={4} align='stretch' onSubmit={handleFormSubmit}>
        <FormControl id="specialization" isRequired>
          <FormLabel>Specialization</FormLabel>
          <Select
            placeholder="Select specialization"
            value={specialization}
            onChange={handleSpecializationChange}
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="doctor" isRequired>
          <FormLabel>Doctor</FormLabel>
          <Select
            placeholder="Select doctor"
            value={doctor}
            onChange={handleDoctorChange}
            isDisabled={!specialization}
          >
            {specialization &&
              doctors[specialization].map((doc) => (
                <option key={doc.name} value={doc.name}>
                  {doc.name}
                </option>
              ))}
          </Select>
        </FormControl>

        {doctorImage && (
          <Box mt={4} textAlign="center">
            <Image src={doctorImage} alt={doctor} boxSize="100px" borderRadius="full" />
          </Box>
        )}

        <FormControl id="date" isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="time" isRequired>
          <FormLabel>Time</FormLabel>
          <Select
            placeholder="Select time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            isDisabled={!date}
          >
            {date &&
              availableTimes[date] &&
              availableTimes[date].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl id="patientName" isRequired>
          <FormLabel>Patient Name</FormLabel>
          <Input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </FormControl>

        <FormControl id="patientEmail" isRequired>
          <FormLabel>Patient Email</FormLabel>
          <Input
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="patientPhone" isRequired>
          <FormLabel>Patient Phone</FormLabel>
          <Input
            type="tel"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
          />
        </FormControl>

        <FormControl id="additionalInfo">
          <FormLabel>Additional Information</FormLabel>
          <Textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" size="lg" mt={4}>
          Schedule Appointment
        </Button>
      </VStack>
    </Card>
  );
};

export default AppointmentForm;
