"use client"

import { useState, useEffect } from 'react';

const RandomFlavor = () => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch('https://api.scryfall.com/cards/random?q=is%3Aflavor');
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const data = await response.json();
        setCard(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCard();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="items-center justify-items-center">
        <p>{card.flavor_text}</p>
        <p className="italic text-sm text-slate-500">{card.name}</p>
    </div>
  );
};

export default RandomFlavor;
