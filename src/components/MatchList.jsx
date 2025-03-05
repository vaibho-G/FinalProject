import React from 'react';
import ProfileCard from './ProfileCard';

const MatchList = () => {
  const matches = [
    { imageUrl: 'https://via.placeholder.com/150', bio: 'Love hiking!', interests: ['Travel', 'Sports'] },
    { imageUrl: 'https://via.placeholder.com/150', bio: 'Music enthusiast', interests: ['Music', 'Reading'] },
  ];

  return (
    <div className="match-list">
      <h2>Potential Matches</h2>
      {matches.map((match, index) => (
        <ProfileCard key={index} {...match} />
      ))}
    </div>
  );
};

export default MatchList;
