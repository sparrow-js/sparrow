// NOTE: 仅用作类型标注，切勿作为实体使用
import { BuiltinSimulatorHost } from './host';

import { BuiltinSimulatorRenderer } from './renderer';


export function createSimulator(
  host: BuiltinSimulatorHost,
  iframe: HTMLIFrameElement,
) {
  const win: any = iframe.contentWindow;
  const doc = iframe.contentDocument!;

  win.LCSimulatorHost = host;
  (window as any).LCSimulatorHost = host;
  // return new Promise((resolve) => {
  //   if (win.SimulatorRenderer || host.renderer) {
  //     return resolve(win.SimulatorRenderer || host.renderer);
  //   }
  //   const loaded = () => {
  //     resolve(win.SimulatorRenderer || host.renderer);
  //     win.removeEventListener('load', loaded);
  //   };
  //   win.addEventListener('load', loaded);
  // });
}

// export function createSimulator(
//   host: BuiltinSimulatorHost,
//   iframe: HTMLIFrameElement,
// ): Promise<BuiltinSimulatorRenderer> {
//   const win: any = iframe.contentWindow;
//   const doc = iframe.contentDocument!;

//   win.LCSimulatorHost = host;
//   (window as any).LCSimulatorHost = host;
//   return new Promise((resolve) => {
//     if (win.SimulatorRenderer || host.renderer) {
//       return resolve(win.SimulatorRenderer || host.renderer);
//     }
//     const loaded = () => {
//       resolve(win.SimulatorRenderer || host.renderer);
//       win.removeEventListener('load', loaded);
//     };
//     win.addEventListener('load', loaded);
//   });
// }
