import { ErrorBoundary } from 'react-error-boundary';
import CrashErrorComponent from './components/CrashErrorComponent';
import ExtraSidebar from './components/ExtraSidebarComponent';
import TabsManagerComponent from './FlowPage/components/tabsManagerComponent';
import 'reactflow/dist/style.css';

export default function App() {
    return (
        // need parent component with width and height
      <div className="h-full flex flex-col">
        <ErrorBoundary
          onReset={() => {
          window.localStorage.removeItem('tabsData');
          window.localStorage.clear();
        }}
          FallbackComponent={CrashErrorComponent}
        >
          <div className="flex grow shrink basis-auto min-h-0 flex-1 overflow-hidden">
            <ExtraSidebar />
            {/* Main area */}
            <main className="min-w-0 flex-1 border-t border-gray-200 dark:border-gray-700 flex">
              {/* Primary column */}
              <div className="w-full h-full">
                <TabsManagerComponent />
              </div>
            </main>
          </div>
        </ErrorBoundary>
      </div>

    );
}