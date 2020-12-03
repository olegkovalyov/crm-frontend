import React, { FC, ReactElement } from 'react';
import { LoadInterface } from '../../../interfaces/load.interface';
import SingleLoad from '../single-load/single-load.component';


interface IPropTypes {
  loads: LoadInterface[] | null,
  selectedLoadTab: number,
  handleDeleteLoad: (loadId: number) => void,
  handleDeleteSlot: (slotId: number) => Promise<void>,
  isLoading: boolean,
}

const LoadsPanels: FC<IPropTypes> = (props: IPropTypes): ReactElement => {

  const loads = props.loads ?? [];
  const {
    selectedLoadTab,
    handleDeleteLoad,
    handleDeleteSlot,
    isLoading,
  } = props;

  return (
    <>
      {
        loads.map(load => {
          const id = `simple-tabpanel-${load.order}`;
          const key = `p${load.id}`;
          const ariaLabelledBy = `simple-tab-${load.order}`;
          return <div
            key={key}
            role="tabpanel"
            hidden={selectedLoadTab !== load.order}
            id={id}
            aria-labelledby={ariaLabelledBy}
            aria-controls={`simple-tabpanel-${load.order}`}
          >
            {selectedLoadTab === load.order && (
              <SingleLoad
                handleDeleteLoad={handleDeleteLoad}
                handleDeleteSlot={handleDeleteSlot}
                load={load}
                isLoading={isLoading}
              />
            )}
          </div>;
        })
      }
    </>
  );
};

export default LoadsPanels;
