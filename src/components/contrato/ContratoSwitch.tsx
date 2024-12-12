import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

interface props {
  switchEstado: boolean;
  setSwitchEstado: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ContratoSwitch({ switchEstado, setSwitchEstado }: props) {
  return (
    <div className="flex items-center space-x-2 py-2">
      <Switch
        id="airplane-mode"
        onCheckedChange={() => setSwitchEstado((prev) => !prev)}
        checked={switchEstado}
      />
      <Label htmlFor="airplane-mode">
        {switchEstado ? "Ver vigentes" : "Ver finalizados"}{" "}
      </Label>
    </div>
  );
}
