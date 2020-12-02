import React, { FC } from 'react';

interface PropTypes {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<PropTypes> = (props: PropTypes) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
};

export default TabPanel;
