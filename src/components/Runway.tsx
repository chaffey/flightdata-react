import React from "react";

// Define the type for the runway prop
interface RunwayProps {
  runway: {
    id: number;
    alignment: string;
    surface: string;
  };
}

const Runway: React.FC<RunwayProps> = ({ runway }) => {
  return (
    <div className="border p-4 rounded shadow mb-2">
      <h2 className="text-lg font-semibold">Runway {runway.id}</h2>
      <p>Length: {runway.alignment} ft</p>
      <p>Surface: {runway.surface}</p>
    </div>
  );
};

export default Runway;