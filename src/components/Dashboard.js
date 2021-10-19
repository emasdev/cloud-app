import React from 'react';

export default function Dashboard({ userData }) {
  console.log(userData);
  return (
    <div>
      <ul>
        <p>Nombres: {userData.nombre}</p>
        <p>Apellidos: {userData.apellidos}</p>
        <img src={userData.imageUrl}></img>
      </ul>
    </div>
  );
}
