import React, { FC, ReactElement } from 'react';
import { Tab } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import { LoadInterface } from '../../../interfaces/load.interface';


interface IPropTypes {
  loads: LoadInterface[] | null,
  selectedLoadTab: number,
  handleChangeLoadTab: (event: React.ChangeEvent<{}>, newValue: number) => void,
  className: string,
}

const LoadsTabs: FC<IPropTypes> = (props: IPropTypes): ReactElement => {

  const loads = props.loads ?? [];
  const {
    selectedLoadTab,
    handleChangeLoadTab,
    className,
  } = props;

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={selectedLoadTab}
      onChange={handleChangeLoadTab}
      aria-label="Loads"
      className={className}
    >
      {
        loads.map(load => {
          const key = `t${load.id}`;
          const label = `Load ${load.id}`;
          const id = `vertical-tab-${load.id}`;
          const ariaControls = `vertical-tabpanel-${load.id}`;
          return <Tab
            key={key}
            label={label}
            id={id}
            value={load.id}
            aria-controls={ariaControls}
          />;
        })
      }
    </Tabs>
  );
};

export default LoadsTabs;
