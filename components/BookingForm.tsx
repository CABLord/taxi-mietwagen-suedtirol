
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type BookingFormProps = {
  startAddress: string;
  endAddress: string;
  estimatedFare: number | null;
  selectedVehicle: { name: string };
};

const BookingForm = ({ startAddress, endAddress, estimatedFare, selectedVehicle }: BookingFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', { name, phone, email, notes, startAddress, endAddress, estimatedFare, selectedVehicle });
    toast({
      title: "Buchung erfolgreich",
      description: "Ihre Fahrt wurde gebucht. Wir werden Sie bald kontaktieren.",
    });
    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Fahrt buchen</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="notes">Anmerkungen</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <p><strong>Start:</strong> {startAddress}</p>
        <p><strong>Ziel:</strong> {endAddress}</p>
        <p><strong>Fahrzeug:</strong> {selectedVehicle.name}</p>
        {estimatedFare !== null && (
          <p><strong>Geschätzter Fahrpreis:</strong> {estimatedFare.toFixed(2)} €</p>
        )}
      </div>
      <Button type="submit" className="w-full">Buchen</Button>
    </form>
  );
};

export default BookingForm;
