import React, { useState, useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import ListaEstudios from './ListaEstudios';
import db from '../../FirebaseFirestoreService';

export default function Main({ user, userData }) {
  const [estudios, setEstudios] = useState(null);

  const loadEstudios = async () => {
    console.log("cargar estudios");
    try {
      const docs = await db.readDocuments("estudios", user.uid);
      setEstudios(docs);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    loadEstudios();
  }, []);

  return (
    <ListaEstudios estudios={estudios} />
  );
}
