import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useContext, useRef, useState } from 'react';
import { PopUpContext } from '../../contexts/popUpContext';
import { NodeDataType } from '../../types/flow';
import {
  classNames,
  limitScrollFieldsModal,
  nodeColors,
  nodeIcons,
  toNormalCase,
  toTitleCase,
} from '../../utils';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import InputComponent from '../../components/inputComponent';

// import ModalField from './components/ModalField';
interface ListItem {
  key: string;
  value: string;
}

export default function ListModal({
  value,
  setValue,
}: {
  setValue: (value: ListItem[]) => void;
  value: ListItem[];
}) {
  const [open, setOpen] = useState(true);
  const { closePopUp } = useContext(PopUpContext);
  const [myValue, setMyValue] = useState(value);

  const newItem: ListItem = {
    key: '',
    value: '',
  };
  if (!myValue.length) {
    setMyValue([
      ...value,
      newItem,
    ]);
  }

  const ref = useRef();
  function setModalOpen(x: boolean) {
    setOpen(x);
    if (x === false) {
      setTimeout(() => {
        closePopUp();
      }, 300);
    }
  }
  return (
    <Dialog open onOpenChange={setModalOpen}>
      <DialogTrigger />
      <DialogContent className="lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="pr-2">Edit Node</span>
          </DialogTitle>
          <DialogDescription>
            description
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full h-fit max-h-[415px]">
          <div className="overflow-y-auto max-h-60">
            <ul role="list" className="divide-y divide-gray-100">
              { myValue.map((item, index) => (
                <li className="gap-x-6 py-5">
                  <div key={index}>
                    <label>
                      key:
                      <InputComponent
                        password={false}
                        disableCopyPaste
                        value={item.key}
                        onChange={(t) => {
                      const updatedList = [...myValue];
                      updatedList[index].key = t;
                      setMyValue(updatedList);
                    }}
                      />
                    </label>
                    <br />
                    <label>
                      value:
                      <Textarea
                        ref={ref}
                        className="form-input h-[200px] w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={item.value}
                        onChange={(e) => {
                        const updatedList = [...myValue];
                        updatedList[index].value = e.target.value;
                        setMyValue(updatedList);
                      }}
                        placeholder="message here."
                      />
                    </label>
                  </div>
                </li>
            ))}
            </ul>

          </div>
          <div>
            <Button onClick={() => setMyValue([...myValue, { key: '', value: '' }])}>
              Add Item
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="mt-3"
            onClick={() => {
              setValue(myValue);
              setModalOpen(false);
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
