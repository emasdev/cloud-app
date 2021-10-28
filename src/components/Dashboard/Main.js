import React from 'react';
import { Center } from '@chakra-ui/react';

export default function Main({ userData }) {
  return (
    <Center>
      <ul>
        <h2>Bienvenido al tablero de trabajo</h2>
        <p>{userData.nombre} {userData.apellido_paterno} {userData.apellido_materno}</p>
        {userData.imageUrl && <img src={userData.imageUrl} />}
      </ul>
    </Center>
  );
}
