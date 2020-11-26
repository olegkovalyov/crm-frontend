import React, { FC, ReactElement } from 'react';
import { LoadInterface } from '../../../interfaces/load.interface';
import SingleLoad from '../single-load/single-load.component';


interface IPropTypes {
  loads: LoadInterface[] | null,
  selectedLoadTab: number,
}

const LoadsPanels: FC<IPropTypes> = (props: IPropTypes): ReactElement => {

  const loads = props.loads ?? [];
  const { selectedLoadTab } = props;

  return (
    <>
      {
        loads.map(load => {
          const id = `vertical-tabpanel-${load.id}`;
          const key = `p${load.id}`;
          const ariaLabelledBy = `vertical-tab-${load.id}`;
          return <div
            key={key}
            role="tabpanel"
            hidden={selectedLoadTab !== load.id}
            id={id}
            aria-labelledby={ariaLabelledBy}
          >
            {selectedLoadTab === load.id && (
              <SingleLoad load={load} />
            )}
          </div>;
        })
      }
    </>
  );
};

export default LoadsPanels;
