import React, { useState } from "react";

export default function Footer() {
  const [zoom] = useState(4);
  const options = `&output=embed&z=${zoom}`;
  const googleMaps = `https://maps.google.com/maps?q=59.18670043649679,17.614271872777948&hl=en&z=14&amp${options}`;

  return (
    <iframe
      className="map-frame"
      src={googleMaps}
      title="Insta track map"
    ></iframe>
  );
}
