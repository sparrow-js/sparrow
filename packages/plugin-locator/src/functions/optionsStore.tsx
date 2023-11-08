import { createContext, createSignal, useContext } from "solid-js";
import {
  getStoredOptions,
  listenOnOptionsChanges,
  ProjectOptions,
  setStoredOptions,
} from "@locator/shared";

export type OptionsStore = {
  setOptions: (options: ProjectOptions) => void;
  getOptions: () => ProjectOptions;
};

export function initOptions(): OptionsStore {
  const [signalOptions, setSignalOptions] = createSignal(getStoredOptions());

  // This listens on localStorage changes, but the changes go only from scripts other than the current one and current one's content scripts
  listenOnOptionsChanges((newOptions) => {
    setSignalOptions(newOptions);
  });

  // This listens only on changes from the contents script for this current page
  window.addEventListener(
    "message",
    (event) => {
      // We only accept messages from ourselves
      if (event.source != window) {
        return;
      }

      if (
        event.data.type &&
        event.data.type == "LOCATOR_EXTENSION_UPDATED_OPTIONS"
      ) {
        setSignalOptions(getStoredOptions());
      }
    },
    false
  );

  function setOptions(newOptions: Partial<ProjectOptions>) {
    const savedOptions = getStoredOptions();
    const optionsToSave = { ...savedOptions, ...newOptions };
    setStoredOptions(optionsToSave);
    setSignalOptions(optionsToSave);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.enableLocator = () => {
    setOptions({ disabled: false });
    return "Locator enabled";
  };

  return { setOptions, getOptions: signalOptions };
}

const OptionsContext = createContext<OptionsStore>();

export function OptionsProvider(props: { children: any }) {
  const options = initOptions();

  return (
    <OptionsContext.Provider value={options}>
      {props.children}
    </OptionsContext.Provider>
  );
}

export function useOptions() {
  const options = useContext(OptionsContext);
  if (!options) {
    throw new Error("Options context is not provided");
  }
  return options;
}
