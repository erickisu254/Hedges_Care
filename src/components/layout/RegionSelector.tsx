import React from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { MapPin, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export const RegionSelector = () => {
  const { currentRegion, setRegion, availableRegions } = useRegion();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900">
          <MapPin className="h-4 w-4 text-emerald-600" />
          <span>{currentRegion.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border-emerald-100">
        <DropdownMenuLabel className="text-emerald-900">Select Community Region</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-emerald-50" />
        {availableRegions.map((region) => (
          <DropdownMenuItem
            key={region.id}
            onClick={() => setRegion(region.id)}
            className="flex items-center justify-between cursor-pointer focus:bg-emerald-50 focus:text-emerald-900"
          >
            <div className="flex flex-col">
              <span className="font-medium">{region.name}</span>
              <span className="text-xs text-gray-500">{region.county} County</span>
            </div>
            {currentRegion.id === region.id && (
              <Check className="h-4 w-4 text-emerald-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
