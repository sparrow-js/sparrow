import { ReactNode } from 'react';
import { LocationProvider } from './locationContext';
import { TypesProvider } from './typesContext';
import { TabsProvider } from './tabsContext';
import { AlertProvider } from './alertContext';
import PopUpProvider from './popUpContext';
import { DarkProvider } from './darkContext';

export default function ContextWrapper({ children }: { children: ReactNode }) {
    return (
      <>
        <DarkProvider>
          <TypesProvider>
            <LocationProvider>
              <AlertProvider>
                <TabsProvider>
                  <PopUpProvider>
                    {children}
                  </PopUpProvider>
                </TabsProvider>
              </AlertProvider>

            </LocationProvider>
          </TypesProvider>
        </DarkProvider>
      </>
    );
}