"use client";

import { Switch } from "@/components/ui/switch";

interface ToggleCardProps {
  field: any;
  label: string;
  value: any;
}

const ToggleCard = ({ field, label, value = false }: ToggleCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="shrink-0 font-semibold">{label}</p>
        <div>
          <Switch checked={true}>{value ? "Açık" : "Kapalı"}</Switch>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;
