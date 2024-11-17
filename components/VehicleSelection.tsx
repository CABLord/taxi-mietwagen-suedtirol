
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Vehicle = {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
};

const vehicles: Vehicle[] = [
  { id: 'standard', name: 'Standard', description: 'Komfortables Fahrzeug für bis zu 4 Personen', priceMultiplier: 1 },
  { id: 'premium', name: 'Premium', description: 'Luxuriöses Fahrzeug für bis zu 4 Personen', priceMultiplier: 1.5 },
  { id: 'van', name: 'Van', description: 'Geräumiges Fahrzeug für bis zu 8 Personen', priceMultiplier: 1.8 },
];

type VehicleSelectionProps = {
  onVehicleSelect: (vehicle: Vehicle) => void;
};

const VehicleSelection = ({ onVehicleSelect }: VehicleSelectionProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(vehicles[0].id);

  const handleVehicleChange = (value: string) => {
    setSelectedVehicle(value);
    const vehicle = vehicles.find(v => v.id === value);
    if (vehicle) {
      onVehicleSelect(vehicle);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fahrzeugauswahl</h2>
      <RadioGroup value={selectedVehicle} onValueChange={handleVehicleChange}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="flex items-center space-x-2 border p-2 rounded">
            <RadioGroupItem value={vehicle.id} id={vehicle.id} />
            <Label htmlFor={vehicle.id} className="flex-grow">
              <span className="font-medium">{vehicle.name}</span>
              <p className="text-sm text-gray-500">{vehicle.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default VehicleSelection;
