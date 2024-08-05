import doctor1 from 'assets/img/doctors/Doctor1.png';
import doctor2 from 'assets/img/doctors/Doctor2.png';
import doctor3 from 'assets/img/doctors/Doctor3.png';

const appointments = [
  {
    id: 1,
    date: '2024-08-07',
    time: '10:00 AM',
    type: 'In-Person',
    doctor: 'Dr. John Smith',
    doctorImage: doctor1,
    doctorQualifications: 'MD, PhD',
    doctorSpecialties: ['Cardiology', 'Internal Medicine'],
    location: { address: '123 Main St, City, Country', lat: 0, lng: 0 },
    testsPerformed: ['Blood Test', 'ECG'],
    medicalHistory: 'Hypertension, Diabetes',
    doctorContact: 'john.smith@example.com | +123456789',
    followUp: 'Check blood pressure in 2 weeks',
    instructions: 'Avoid caffeine before the test',
    documents: [
      { name: 'Blood Test Report', link: '/path/to/blood-test-report.pdf' },
      { name: 'ECG Report', link: '/path/to/ecg-report.pdf' }
    ],
    status: 'Confirmed',
    insurance: 'Health Insurance Co.',
    emergencyContact: 'Jane Smith - +987654321',
    patientHistory: 'Patient has a history of hypertension.',
    attachments: ['report1.pdf', 'report2.pdf'],
    notes: 'Patient should follow up with a specialist.',
    visitSummary: 'Discussed treatment plan.',
    previousVisitSummary: 'Previous visit summary details.',
    healthMetrics: 'Blood pressure: 120/80 mmHg',
    prescription: 'Medication A, Medication B',
    billingInformation: 'Insurance covers 80%',
    followUpInstructions: 'Schedule follow-up visit.',
    nextAvailableSlot: '2024-08-15, 9:00 AM',
    historicalMetrics: [
      { date: '2024-07-01', metric: 'Blood Pressure', value: '135/90 mmHg' },
      { date: '2024-06-01', metric: 'Cholesterol', value: '210 mg/dL' }
    ],
    availableSlots: [
      { date: '2024-08-15', time: '9:00 AM', price: '$100' },
      { date: '2024-08-15', time: '11:00 AM', price: '$120' },
      { date: '2024-08-16', time: '2:00 PM', price: '$110' }
    ]
  },
  {
    id: 2,
    date: '2024-08-09',
    time: '2:00 PM',
    type: 'Online',
    doctor: 'Dr. Emily Johnson',
    doctorImage: doctor2,
    location: { address: 'Online Consultation', lat: null, lng: null },
    details: 'Consultation for new symptoms.',
    testsPerformed: ['Blood Test'],
    medicalHistory: 'Patient has been experiencing fatigue and headache.',
    doctorContact: 'emily.johnson@example.com | +1 234 567 891',
    followUp: 'Follow-up required if symptoms persist.',
    instructions: 'Prepare a list of symptoms and questions.',
    documents: [
      { name: 'Blood Test Results', link: '#' }
    ],
    status: 'Pending',
    insurance: 'Health Insurance Company - Plan B',
    emergencyContact: 'John Doe | +1 234 567 892',
    patientHistory: 'No significant previous medical history.',
    attachments: ['Attachment3.pdf'],
    notes: 'Ensure a stable internet connection for the video call.',
    doctorQualifications: 'MD, Neurology',
    doctorSpecialties: ['Neurology', 'Internal Medicine'],
    visitSummary: 'Initial consultation for symptoms investigation.',
    previousVisitSummary: 'No previous visits.',
    healthMetrics: 'Symptoms include headache and fatigue.',
    prescription: 'Pending',
    billingInformation: 'Amount Due: $100, Payment Method: Online',
    followUpInstructions: 'Consult again if symptoms worsen.',
    nextAvailableSlot: '2024-08-16',
    historicalMetrics: []
  },
  {
    id: 3,
    date: '2024-08-11',
    time: '11:30 AM',
    type: 'In-Person',
    doctor: 'Dr. Michael Brown',
    doctorImage: doctor3,
    location: { address: 'Health Clinic, Room 204', lat: 40.712776, lng: -74.005974 },
    details: 'Review of treatment plan and medication adjustments.',
    testsPerformed: ['X-Ray', 'MRI'],
    medicalHistory: 'Patient recovering from recent surgery.',
    doctorContact: 'michael.brown@example.com | +1 234 567 892',
    followUp: 'Adjust treatment plan as needed.',
    instructions: 'Bring recent test results and medications.',
    documents: [
      { name: 'Surgery Report', link: '#' },
      { name: 'MRI Results', link: '#' }
    ],
    status: 'Confirmed',
    insurance: 'Health Insurance Company - Plan C',
    emergencyContact: 'Alice Brown | +1 234 567 894',
    patientHistory: 'Recent knee surgery.',
    attachments: ['Attachment4.pdf'],
    notes: 'Ensure all required documents are brought.',
    doctorQualifications: 'MD, Orthopedics',
    doctorSpecialties: ['Orthopedics', 'Sports Medicine'],
    visitSummary: 'Follow-up on post-surgery recovery.',
    previousVisitSummary: 'Surgery performed on 2024-07-15.',
    healthMetrics: 'Recovery progress monitored through X-Ray and MRI.',
    prescription: 'Medication: Pain relief as needed',
    billingInformation: 'Amount Due: $200, Payment Method: Credit Card',
    followUpInstructions: 'Monitor recovery and follow-up as necessary.',
    nextAvailableSlot: '2024-08-20',
    historicalMetrics: []
  }
];

export default appointments;
