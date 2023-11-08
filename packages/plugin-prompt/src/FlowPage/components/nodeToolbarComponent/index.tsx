import React, { useContext, useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import {
  Cog6ToothIcon,
  TrashIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
  Square2StackIcon,
} from '@heroicons/react/24/outline';
import { classNames } from '../../../utils';
import { TabsContext } from '../../../contexts/tabsContext';
import { useReactFlow } from 'reactflow';
import ShadTooltip from '../../../components/ShadTooltipComponent';

const NodeToolbarComponent = (props) => {
  const [nodeLength, setNodeLength] = useState(
    Object.keys(props.data.node.template).filter(
      (t) => t.charAt(0) !== '_' &&
        props.data.node.template[t].show &&
        (props.data.node.template[t].type === 'str' ||
          props.data.node.template[t].type === 'bool' ||
          props.data.node.template[t].type === 'float' ||
          props.data.node.template[t].type === 'code' ||
          props.data.node.template[t].type === 'prompt' ||
          props.data.node.template[t].type === 'file' ||
          props.data.node.template[t].type === 'Any' ||
          props.data.node.template[t].type === 'int'),
    ).length,
  );

  const { setLastCopiedSelection, paste } = useContext(TabsContext);
  const reactFlowInstance = useReactFlow();
  return (
    <>
      <div className="h-10 w-26">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <ShadTooltip delayDuration={1000} content="Delete" side="top">
            <button
              className="hover:dark:hover:bg-[#242f47] text-gray-700 transition-all duration-500 ease-in-out dark:bg-gray-800 dark:text-gray-300 shadow-md relative inline-flex items-center rounded-l-md bg-white px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={() => {
                props.deleteNode(props.data.id);
              }}
            >
              <TrashIcon className="w-5 h-5 dark:text-gray-300" />
            </button>
          </ShadTooltip>

          <ShadTooltip delayDuration={1000} content="Duplicate" side="top">
            <button
              className={classNames(
                nodeLength > 0
                  ? 'hover:dark:hover:bg-[#242f47] text-gray-700 transition-all duration-500 ease-in-out dark:bg-gray-800 dark:text-gray-300 shadow-md relative -ml-px inline-flex items-center bg-white px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10'
                  : 'hover:dark:hover:bg-[#242f47] text-gray-700 transition-all duration-500 ease-in-out dark:bg-gray-800 dark:text-gray-300 shadow-md relative -ml-px inline-flex items-center bg-white px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 rounded-r-md',
              )}
              onClick={(event) => {
                event.preventDefault();
                // console.log(reactFlowInstance.getNode(props.data.id));
                paste(
                  {
                    nodes: [reactFlowInstance.getNode(props.data.id)],
                    edges: [],
                  },
                  {
                    x: 50,
                    y: 10,
                    paneX: reactFlowInstance.getNode(props.data.id).position.x,
                    paneY: reactFlowInstance.getNode(props.data.id).position.y,
                  },
                );
              }}
            >
              <Square2StackIcon className="w-5 h-5  dark:text-gray-300" />
            </button>
          </ShadTooltip>

          {nodeLength > 0 && (
            <ShadTooltip delayDuration={1000} content="Edit" side="top">
              <button
                className="hover:dark:hover:bg-[#242f47] text-gray-700 transition-all duration-500 ease-in-out dark:bg-gray-800 dark:text-gray-300 shadow-md relative -ml-px inline-flex items-center bg-white px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 rounded-r-md"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                <PencilSquareIcon className="w-5 h-5  dark:text-gray-300" />
              </button>
            </ShadTooltip>
          )}
        </span>
      </div>
    </>
  );
};

export default NodeToolbarComponent;
