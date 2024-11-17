
"use client";

import Layout from '../components/layout'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateFare } from '../utils/fareCalculation'
import dynamic from 'next/dynamic'
import VehicleSelection from '../components/VehicleSelection'
import BookingForm from '../components/BookingForm'
import AuthForm from '../components/AuthForm'
import BookingHistory from '../components/BookingHistory'
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from '../components/LanguageContext'
import { useAuth } from '../components/AuthContext'
import { FormattedMessage, useIntl } from 'react-intl'

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <p><FormattedMessage id="loading" /></p>
})

type Vehicle = {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
};

export default function Home() {
  const { locale, setLocale } = useLanguage()
  const { user, logout } = useAuth()
  const intl = useIntl()
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>({
    id: 'standard',
    name: intl.formatMessage({ id: 'standardVehicle' }),
    description: intl.formatMessage({ id: 'standardVehicleDescription' }),
    priceMultiplier: 1
  })
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showBookingHistory, setShowBookingHistory] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Route planning:', { startAddress, endAddress, vehicle: selectedVehicle.name })
    // Here we would typically call an API to calculate the route and distance
    // For now, we'll use a mock distance of 10 km
    const mockDistance = 10
    const baseFare = calculateFare(mockDistance)
    const adjustedFare = baseFare * selectedVehicle.priceMultiplier
    setEstimatedFare(adjustedFare)
    setShowBookingForm(true)
  }

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    if (estimatedFare !== null) {
      const baseFare = estimatedFare / selectedVehicle.priceMultiplier
      const newFare = baseFare * vehicle.priceMultiplier
      setEstimatedFare(newFare)
    }
  }

  const handleBack = () => {
    setShowBookingForm(false)
    setShowBookingHistory(false)
  }

  const toggleLanguage = () => {
    setLocale(locale === 'de' ? 'en' : 'de')
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">
            <FormattedMessage id="welcome" />
          </h1>
          <div className="space-x-2">
            <Button onClick={toggleLanguage}>
              {locale === 'de' ? 'English' : 'Deutsch'}
            </Button>
            {user ? (
              <>
                <Button onClick={() => setShowBookingHistory(!showBookingHistory)}>
                  <FormattedMessage id={showBookingHistory ? "newBooking" : "bookingHistory"} />
                </Button>
                <Button onClick={logout}>
                  <FormattedMessage id="logout" />
                </Button>
              </>
            ) : null}
          </div>
        </div>
        {user ? (
          showBookingHistory ? (
            <BookingHistory />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {!showBookingForm ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="startAddress">
                          <FormattedMessage id="startAddress" />
                        </Label>
                        <Input
                          id="startAddress"
                          value={startAddress}
                          onChange={(e) => setStartAddress(e.target.value)}
                          placeholder={intl.formatMessage({ id: 'enterStartAddress' })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endAddress">
                          <FormattedMessage id="endAddress" />
                        </Label>
                        <Input
                          id="endAddress"
                          value={endAddress}
                          onChange={(e) => setEndAddress(e.target.value)}
                          placeholder={intl.formatMessage({ id: 'enterEndAddress' })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <FormattedMessage id="planRoute" />
                      </Button>
                    </form>
                    <VehicleSelection onVehicleSelect={handleVehicleSelect} />
                    {estimatedFare !== null && (
                      <div className="p-4 bg-green-100 rounded-md">
                        <p className="font-bold">
                          <FormattedMessage id="estimatedFare" />: {estimatedFare.toFixed(2)} €
                        </p>
                        <p className="text-sm">
                          <FormattedMessage id="vehicle" />: {selectedVehicle.name}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <BookingForm
                    startAddress={startAddress}
                    endAddress={endAddress}
                    estimatedFare={estimatedFare}
                    selectedVehicle={selectedVehicle}
                    onBack={handleBack}
                  />
                )}
              </div>
              <div className="h-[400px] lg:h-[600px]">
                <MapComponent />
              </div>
            </div>
          )
        ) : (
          <AuthForm />
        )}
      </div>
      <Toaster />
    </Layout>
  )
}
