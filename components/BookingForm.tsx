
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useIntl, FormattedMessage } from 'react-intl';

type BookingFormProps = {
  startAddress: string;
  endAddress: string;
  estimatedFare: number | null;
  selectedVehicle: { name: string };
  onBack: () => void;
};

export function BookingForm({ startAddress, endAddress, estimatedFare, selectedVehicle, onBack }: BookingFormProps) {
  const intl = useIntl();
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Booking submitted:', { ...formData, startAddress, endAddress, estimatedFare, selectedVehicle })
    toast({
      title: intl.formatMessage({ id: 'bookingSuccessTitle' }),
      description: intl.formatMessage({ id: 'bookingSuccessDescription' }),
    })
    // Reset form
    setFormData({ name: '', email: '', phone: '', notes: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold"><FormattedMessage id="bookRide" /></h2>
      <div>
        <Label htmlFor="name"><FormattedMessage id="name" /></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={intl.formatMessage({ id: 'enterName' })}
        />
      </div>
      <div>
        <Label htmlFor="email"><FormattedMessage id="email" /></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
        />
      </div>
      <div>
        <Label htmlFor="phone"><FormattedMessage id="phone" /></Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder={intl.formatMessage({ id: 'enterPhone' })}
        />
      </div>
      <div>
        <Label htmlFor="notes"><FormattedMessage id="notes" /></Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
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
        <Button type="submit" className="w-1/2">
          <FormattedMessage id="book" />
        </Button>
      </div>
    </form>
  )
}
