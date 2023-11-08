import { locationContext } from '../../contexts/locationContext';
import { useContext, useState } from 'react';

export default function ExtraSidebar() {
    const {
        extraComponent,
        extraNavigation,
    } = useContext(locationContext);

    return (
      <>
        <aside
          className={'w-52 flex-shrink-0 flex overflow-hidden flex-col border-r dark:border-r-gray-700 transition-all duration-500'}
        >
          <div className="w-52 dark:bg-gray-800 border dark:border-gray-700  overflow-y-auto scrollbar-hide h-full flex flex-col items-start">
            <div className="flex px-4 justify-between align-middle w-full">
              <span className="text-gray-900 dark:text-white py-[2px] font-medium " />
            </div>
            <div className="flex flex-grow flex-col w-full">
              {
            extraNavigation.options ? (
              <div>
                nav
              </div>
            ) : (extraComponent)

          }
            </div>
          </div>
        </aside>
      </>
    );
}