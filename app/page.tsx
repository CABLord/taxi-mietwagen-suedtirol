
"use client";

import Layout from '../components/layout'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateFare } from '../utils/fareCalculation'
import dynamic from 'next/dynamic'
import VehicleSelection from '../components/VehicleSelection'

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <p>Karte wird geladen...</p>
})

type Vehicle = {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
};

export default function Home() {
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>({
    id: 'standard',
    name: 'Standard',
    description: 'Komfortables Fahrzeug für bis zu 4 Personen',
    priceMultiplier: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Route planning:', { startAddress, endAddress, vehicle: selectedVehicle.name })
    // Here we would typically call an API to calculate the route and distance
    // For now, we'll use a mock distance of 10 km
    const mockDistance = 10
    const baseFare = calculateFare(mockDistance)
    const adjustedFare = baseFare * selectedVehicle.priceMultiplier
    setEstimatedFare(adjustedFare)
  }

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    if (estimatedFare !== null) {
      const baseFare = estimatedFare / selectedVehicle.priceMultiplier
      const newFare = baseFare * vehicle.priceMultiplier
      setEstimatedFare(newFare)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Willkommen bei Südtirol Taxi & Mietwagen</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="startAddress">Startadresse</Label>
                <Input
                  id="startAddress"
                  value={startAddress}
                  onChange={(e) => setStartAddress(e.target.value)}
                  placeholder="Geben Sie die Startadresse ein"
                  required
                />
              </div>
              <div>
                <Label htmlFor="endAddress">Zieladresse</Label>
                <Input
                  id="endAddress"
                  value={endAddress}
                  onChange={(e) => setEndAddress(e.target.value)}
                  placeholder="Geben Sie die Zieladresse ein"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Route planen</Button>
            </form>
            <VehicleSelection onVehicleSelect={handleVehicleSelect} />
            {estimatedFare !== null && (
              <div className="mt-4 p-4 bg-green-100 rounded-md">
                <p className="font-bold">Geschätzter Fahrpreis: {estimatedFare.toFixed(2)} €</p>
                <p className="text-sm">Fahrzeug: {selectedVehicle.name}</p>
              </div>
            )}
          </div>
          <div className="h-[400px]">
            <MapComponent />
          </div>
        </div>
      </div>
    </Layout>
  )
}
