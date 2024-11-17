
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useIntl, FormattedMessage } from 'react-intl';

type BookingFormProps = {
  startAddress: string;
  endAddress: string;
  estimatedFare: number | null;
  selectedVehicle: { name: string };
  onBack: () => void;
};

const BookingForm = ({ startAddress, endAddress, estimatedFare, selectedVehicle, onBack }: BookingFormProps) => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Here you would typically send the booking data to your backend
      // Simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Booking submitted:', { name, phone, email, notes, startAddress, endAddress, estimatedFare, selectedVehicle });
      toast({
        title: intl.formatMessage({ id: 'bookingSuccessTitle' }),
        description: intl.formatMessage({ id: 'bookingSuccessDescription' }),
      });
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: intl.formatMessage({ id: 'bookingErrorTitle' }),
        description: intl.formatMessage({ id: 'bookingErrorDescription' }),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold"><FormattedMessage id="bookRide" /></h2>
      <div>
        <Label htmlFor="name"><FormattedMessage id="name" /></Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={intl.formatMessage({ id: 'enterName' })}
        />
      </div>
      <div>
        <Label htmlFor="phone"><FormattedMessage id="phone" /></Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder={intl.formatMessage({ id: 'enterPhone' })}
        />
      </div>
      <div>
        <Label htmlFor="email"><FormattedMessage id="email" /></Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
        />
      </div>
      <div>
        <Label htmlFor="notes"><FormattedMessage id="notes" /></Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={intl.formatMessage({ id: 'enterNotes' })}
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <p><strong><FormattedMessage id="start" />:</strong> {startAddress}</p>
        <p><strong><FormattedMessage id="destination" />:</strong> {endAddress}</p>
        <p><strong><FormattedMessage id="vehicle" />:</strong> {selectedVehicle.name}</p>
        {estimatedFare !== null && (
          <p><strong><FormattedMessage id="estimatedFare" />:</strong> {estimatedFare.toFixed(2)} €</p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button type="button" variant="outline" onClick={onBack} className="w-1/2">
          <FormattedMessage id="back" />
        </Button>
        <Button type="submit" className="w-1/2" disabled={isSubmitting}>
          {isSubmitting ? <FormattedMessage id="booking" /> : <FormattedMessage id="book" />}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
