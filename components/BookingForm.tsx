
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true);
    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      console.log('Booking submitted:', { ...formData, startAddress, endAddress, estimatedFare, selectedVehicle })
      toast({
        title: intl.formatMessage({ id: 'bookingSuccessTitle' }),
        description: intl.formatMessage({ id: 'bookingSuccessDescription' }),
      })
      // Reset form
      setFormData({ name: '', email: '', phone: '', notes: '' })
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
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
    </form>
  )
}
