import React, { FC, ReactElement } from 'react';

export default (req, res) => {
  res.status(200).json({ name: 'John Doe2' });
};
