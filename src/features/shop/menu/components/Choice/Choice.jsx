import React from 'react';
import CheckboxChoice from './CheckboxChoice';
import RadioButtonChoice from './RadioButtonChoice';

function Choice({ choice }) {
  // if (choice.minRequired === 1 && choice.maxAllowed === 1) {
  //   return <RadioButtonChoice choice={choice} />;
  //   return null;
  // } else {
  //   return <CheckboxChoice choice={choice} />;
  // }

  return <CheckboxChoice choice={choice} />;
}

export default Choice;
