
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { useAuth } from './AuthContext';

interface Booking {
  id: string;
  startAddress: string;
  endAddress: string;
  date: string;
  status: string;
  fare: number;
  vehicleType: string;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const intl = useIntl();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError('Error fetching booking history');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <div><FormattedMessage id="loading" /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold"><FormattedMessage id="bookingHistory" /></h2>
      {bookings.length === 0 ? (
        <p><FormattedMessage id="noBookings" /></p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-4 rounded-md">
              <div className="flex justify-between">
                <span className="font-semibold">{booking.vehicleType}</span>
                <span className={`capitalize ${booking.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>
                  <FormattedMessage id={booking.status} />
                </span>
              </div>
              <div><FormattedMessage id="from" />: {booking.startAddress}</div>
              <div><FormattedMessage id="to" />: {booking.endAddress}</div>
              <div>
                <FormattedMessage id="date" />: <FormattedDate value={new Date(booking.date)} year="numeric" month="long" day="numeric" />
              </div>
              <div>
                <FormattedMessage id="fare" />: <FormattedNumber value={booking.fare} style="currency" currency="EUR" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
