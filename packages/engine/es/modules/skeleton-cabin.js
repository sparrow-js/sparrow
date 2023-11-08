import _extends from "@babel/runtime/helpers/extends";
import { Workbench as InnerWorkbench } from '@firefly/auto-editor-skeleton';
export default function getSkeletonCabin(skeleton) {
  return {
    Workbench: function Workbench(props) {
      return /*#__PURE__*/React.createElement(InnerWorkbench, _extends({}, props, {
        skeleton: skeleton
      }));
    } // hijack skeleton
  };
}