"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../assets/Spinner'; // Ajusta la ruta según la ubicación de tu Spinner

const CharacterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
          setCharacter(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching data');
          setLoading(false);
        }
      };

      fetchCharacter();
    }
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">{character.name}</h1>
        <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg mb-4" />
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <p><strong>Location:</strong> {character.location.name}</p>
      </div>
    </div>
  );
};

export default CharacterPage;