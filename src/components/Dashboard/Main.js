import React from 'react';
import { Center } from '@chakra-ui/react';

export default function Main({ userData }) {
  return (
    <Center>
      <ul>
        <p>Nombres: {userData.nombre}</p>
        <p>Apellidos: {userData.apellidos}</p>
        <img src={userData.imageUrl}></img>
      </ul>
    </Center>
  );
}
