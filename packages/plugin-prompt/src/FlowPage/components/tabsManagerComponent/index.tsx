import { useContext, useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import TabComponent from '../tabComponent';
import { TabsContext } from '../../../contexts/tabsContext';
import FlowPage from '../..';
import { darkContext } from '../../../contexts/darkContext';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BellIcon,
  CodeBracketSquareIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { PopUpContext } from '../../../contexts/popUpContext';
import { alertContext } from '../../../contexts/alertContext';
import { typesContext } from '../../../contexts/typesContext';

export default function TabsManagerComponent() {
  const { flows, addFlow, tabIndex, setTabIndex, uploadFlow, downloadFlow, saveChain, clearFlow } =
    useContext(TabsContext);
  const { openPopUp } = useContext(PopUpContext);
  const { templates } = useContext(typesContext);
  const AlertWidth = 384;
  const { dark, setDark } = useContext(darkContext);
  const { notificationCenter, setNotificationCenter } =
    useContext(alertContext);
  useEffect(() => {
    // create the first flow
    if (flows.length === 0 && Object.keys(templates).length > 0) {
      addFlow();
    }
  }, [addFlow, flows.length, templates]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex pr-2 flex-row text-center items-center bg-gray-100 dark:bg-gray-800 px-2">
        {flows.map((flow, index) => {
          return (
            <TabComponent
              onClick={() => setTabIndex(index)}
              selected={index === tabIndex}
              key={index}
              flow={flow}
            />
          );
        })}
        {/* <TabComponent
          onClick={() => {
            addFlow();
          }}
          selected={false}
          flow={null}
        /> */}
        <div className="ml-auto mr-2 flex gap-3">
          <button
            onClick={async () => {
              await saveChain();
            }}
            className="flex items-center gap-1 pr-2 border-gray-400 border-r text-sm text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
          >
            保存 <CodeBracketSquareIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
            onClick={() => {
              clearFlow();
            }}
          >
            清除
          </button>
          {/* <button
            className="text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
            onClick={() => {
              setDark(!dark);
            }}
          >
            {dark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button> */}
          {/* <button
            className="text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 relative"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setNotificationCenter(false);
              const { top } = (event.target as Element).getBoundingClientRect();
              const { left } = (event.target as Element).getBoundingClientRect();
            }}
          >
            {notificationCenter && (
              <div className="absolute w-1.5 h-1.5 rounded-full bg-red-600 right-[3px]" />
            )}
            <BellIcon className="h-5 w-5" aria-hidden="true" />
          </button> */}
        </div>
      </div>
      <div className="w-full h-full dark:bg-gray-800">
        <ReactFlowProvider>
          {flows[tabIndex] ? (
            <FlowPage flow={flows[tabIndex]} />
          ) : (
            <></>
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
}