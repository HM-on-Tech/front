import { Button } from '@material-ui/core';
import React from 'react'


export const CustomLeftArrow = ({ onClick }) => (
  <Button onClick={() => onClick()} className="custom-left-arrow" />
);
export const CustomRightArrow = ({ onClick }) => {
  return <Button className="custom-right-arrow" onClick={() => onClick()} />;
};
