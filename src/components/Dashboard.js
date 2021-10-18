import React from 'react';

export default function Dashboard({ userData }) {
  return (
    <div>
      <ul>
        <p>Nombres: {userData.nombre}</p>
        <p>Apellidos: {userData.apellidos}</p>
      </ul>
    </div>
  );
}
