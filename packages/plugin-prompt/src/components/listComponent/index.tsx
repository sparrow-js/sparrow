import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { PopUpContext } from '../../contexts/popUpContext';
import { TextAreaComponentType } from '../../types/components';
import { TypeModal } from '../../utils';
import ListModal from '../../modals/ListModal';

export interface ListComponentType {
    disabled: boolean;
    onChange: (value: Array<
      {
        key: string;
        value: string;
      }
    >) => void;
    value: Array<
      {
        key: string;
        value: string;
      }
    >;
}

export default function ListComponent({
  value,
  onChange,
  disabled,
}: ListComponentType) {
  const [myValue, setMyValue] = useState(value);
  const { openPopUp } = useContext(PopUpContext);
  useEffect(() => {
    if (disabled) {
    //   setMyValue('');
      onChange([]);
    }
  }, [disabled, onChange]);
  return (
    <div
      className={
        disabled ? 'pointer-events-none cursor-not-allowed w-full' : ' w-full'
      }
    >
      <div className="w-full flex items-center gap-3">
        <span
          onClick={() => {
            openPopUp(
              <ListModal
                value={myValue}
                setValue={(t: Array<{
                    key: string;
                    value: string;
                }>) => {
                  setMyValue(t);
                  onChange(t);
                }}
              />,
            );
          }}
          className={
              'truncate block w-full text-gray-500 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          }
        >
          编辑
        </span>
        <button
          onClick={() => {
            openPopUp(
              <ListModal
                value={myValue}
                setValue={(t: Array<{
                    key: string;
                    value: string;
                }>) => {
                  setMyValue(t);
                  onChange(t);
                }}
              />,
            );
          }}
        >
          <ArrowTopRightOnSquareIcon className="w-6 h-6 hover:text-blue-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
