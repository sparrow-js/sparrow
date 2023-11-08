import { ReactNode } from 'react';
interface locationContextType {
    extraComponent: any;
    setExtraComponent: (newState: any) => void;
}
export declare const locationContext: import("react").Context<locationContextType>;
export declare function LocationProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export {};
