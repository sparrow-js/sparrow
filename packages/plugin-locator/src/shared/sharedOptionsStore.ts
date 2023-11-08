export type ProjectOptions = {
    projectPath?: string;
    templateOrTemplateId?: string;
    adapterId?: string;
    replacePath?: {
      from: string;
      to: string;
    };
    disabled?: boolean;
    showIntro?: boolean;
    welcomeScreenDismissed?: boolean;
    hrefTarget?: '_blank' | '_self';
  };

  export function getStoredOptions() {
    const options: ProjectOptions = {};
    const storedOptions = localStorage.getItem('LOCATOR_OPTIONS');
    if (storedOptions) {
      const parsedOptions = JSON.parse(storedOptions);
      if (typeof parsedOptions.projectPath === 'string') {
        options.projectPath = parsedOptions.projectPath;
      }
      if (typeof parsedOptions.templateOrTemplateId === 'string') {
        options.templateOrTemplateId = parsedOptions.templateOrTemplateId;
      }
      if (typeof parsedOptions.adapterId === 'string') {
        options.adapterId = parsedOptions.adapterId;
      }
      if (typeof parsedOptions.replacePath === 'object') {
        if (
          typeof parsedOptions.replacePath.from === 'string' &&
          typeof parsedOptions.replacePath.to === 'string'
        ) {
          options.replacePath = {
            from: parsedOptions.replacePath.from,
            to: parsedOptions.replacePath.to,
          };
        }
      }
      if (typeof parsedOptions.disabled === 'boolean') {
        options.disabled = parsedOptions.disabled;
      }
      if (typeof parsedOptions.showIntro === 'boolean') {
        options.showIntro = parsedOptions.showIntro;
      }
      if (typeof parsedOptions.hrefTarget === 'string') {
        options.hrefTarget = parsedOptions.hrefTarget;
      }
      if (typeof parsedOptions.welcomeScreenDismissed === 'boolean') {
        options.welcomeScreenDismissed = parsedOptions.welcomeScreenDismissed;
      }
    }

    return options;
  }

  export function setStoredOptions(options: ProjectOptions) {
    localStorage.setItem('LOCATOR_OPTIONS', JSON.stringify(options));
  }

  export function cleanOptions() {
    localStorage.removeItem('LOCATOR_OPTIONS');
  }

  export function listenOnOptionsChanges(fn: (options: ProjectOptions) => void) {
    let currentRawData = localStorage.getItem('LOCATOR_OPTIONS');
    addEventListener('storage', (event) => {
      if ('LOCATOR_OPTIONS' !== event.key) {
        return;
      }
      const newData = localStorage.getItem('LOCATOR_OPTIONS');
      if (newData !== currentRawData) {
        currentRawData = newData;
        fn(getStoredOptions());
      }
    });
  }