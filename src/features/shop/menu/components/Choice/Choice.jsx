import React from 'react';

function Choice({ choice }) {
  if (choice.maxAllowed === -1) {
  }
  return <div>{choice.name}</div>;
}

export default Choice;
