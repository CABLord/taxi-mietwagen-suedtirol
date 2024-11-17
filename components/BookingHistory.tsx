
"use client"

import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useAuth } from './AuthContext';
import { useToast } from "@/components/ui/use-toast"

type Booking = {
  id: string;
  date: string;
  startAddress: string;
  endAddress: string;
  fare: number;
};

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const intl = useIntl();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Here you would typically fetch the bookings from your API
        // For demonstration, we'll use mock data
        const mockBookings: Booking[] = [
          { id: '1', date: '2023-05-01', startAddress: 'Bolzano', endAddress: 'Merano', fare: 50 },
          { id: '2', date: '2023-05-05', startAddress: 'Bressanone', endAddress: 'Vipiteno', fare: 40 },
        ];
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: intl.formatMessage({ id: 'bookingHistoryErrorTitle' }),
          description: intl.formatMessage({ id: 'bookingHistoryErrorDescription' }),
          variant: "destructive",
        });
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, toast, intl]);

  if (!user) {
    return <p><FormattedMessage id="pleaseLogin" /></p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4"><FormattedMessage id="bookingHistory" /></h2>
      {bookings.length === 0 ? (
        <p><FormattedMessage id="noBookings" /></p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-4 rounded-md">
              <p><strong><FormattedMessage id="date" />:</strong> {booking.date}</p>
              <p><strong><FormattedMessage id="from" />:</strong> {booking.startAddress}</p>
              <p><strong><FormattedMessage id="to" />:</strong> {booking.endAddress}</p>
              <p><strong><FormattedMessage id="fare" />:</strong> {booking.fare} €</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
