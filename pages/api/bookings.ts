import { NextApiRequest, NextApiResponse } from 'next';

// This is a mock database. In a real application, you'd use a proper database.
const bookings = [
  {
    id: '1',
    userId: '1',
    startAddress: 'Bolzano Central Station',
    endAddress: 'Merano Thermal Baths',
    date: '2024-11-20',
    status: 'completed',
    fare: 45.50,
    vehicleType: 'Standard'
  },
  {
    id: '2',
    userId: '1',
    startAddress: 'Bressanone Cathedral',
    endAddress: 'Dolomites, Val Gardena',
    date: '2024-11-25',
    status: 'upcoming',
    fare: 75.00,
    vehicleType: 'Premium'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // In a real application, you'd fetch bookings for the authenticated user
    // For now, we'll return all bookings
    res.status(200).json(bookings);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
