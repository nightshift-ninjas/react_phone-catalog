import React, { useEffect } from 'react';
import './CreatorsPage.scss';
import { creators } from './data';
import { CreatorCard } from './components/CreatorCard';
import type { CreatorInfo } from './types';

const shuffleArray = (array: CreatorInfo[]) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const CreatorsPage: React.FC = () => {
  const shuffledCreators = shuffleArray(creators);

  useEffect(() => {
      window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
      });
  }, []);
  return (
    <div className="creators">
      <ul className="creators__list">
        {shuffledCreators.map((creator) => (
          <li className="creators__item" key={creator.key}>
            <CreatorCard creator={creator} />
          </li>
        ))}
      </ul>
    </div>
  );
};
