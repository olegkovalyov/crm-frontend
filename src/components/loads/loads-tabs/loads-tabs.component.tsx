import React, { FC, ReactElement } from 'react';
import { Tab } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import { LoadInterface } from '../../../interfaces/load.interface';
import { useStyles } from './loads-tabs.styles';


interface IPropTypes {
  loads: LoadInterface[] | null,
  selectedLoadTab: number,
  handleChangeLoadTab: (event: React.ChangeEvent<{}>, newValue: number) => void,
}

const LoadsTabs: FC<IPropTypes> = (props: IPropTypes): ReactElement => {
  const classes = useStyles();

  const loads = props.loads ?? [];
  const {
    selectedLoadTab,
    handleChangeLoadTab,
  } = props;

  return (
    <Tabs
      value={selectedLoadTab}
      onChange={handleChangeLoadTab}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      orientation="horizontal"
      scrollButtons="auto"
      className={classes.tabs}
    >
      {
        loads.map(load => {
          const key = `t${load.order}`;
          const label = `Load ${load.order +1 }`;
          const id = `scrollable-auto-tab-${load.order}`;
          const ariaControls = `scrollable-auto-tabpanel-${load.order}`;
          return <Tab
            key={key}
            label={label}
            id={id}
            aria-controls={ariaControls}
          />;
        })
      }
    </Tabs>
  );
};

export default LoadsTabs;
