import { createContext, ReactNode, useState } from 'react';


interface locationContextType {
    extraNavigation: {
      title: string;
      options?: Array<{
        name: string;
        href: string;
        icon: any;
        children?: Array<any>;
      }>;
    };
    setExtraNavigation: (newState: {
      title: string;
      options?: Array<{
        name: string;
        href: string;
        icon: any;
        children?: Array<any>;
      }>;
    }) => void;
    extraComponent: any;
    setExtraComponent: (newState: any) => void;
}

const initialValue = {
    extraNavigation: { title: '' },
    setExtraNavigation: () => {},
    extraComponent: <></>,
    setExtraComponent: () => {},
};

export const locationContext = createContext<locationContextType>(initialValue);
export function LocationProvider({ children }: { children: ReactNode }) {
  const [extraNavigation, setExtraNavigation] = useState({ title: '' });
    const [extraComponent, setExtraComponent] = useState(<></>);

    return (
      <locationContext.Provider
        value={{
            extraNavigation,
            setExtraNavigation,
            extraComponent,
            setExtraComponent,
        }}
      >
        {children}
      </locationContext.Provider>
    );
}

