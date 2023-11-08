import { ReactElement } from 'react';
import { TooltipComponentType } from '../../types/components';

export default function Tooltip({
  children,
  title,
  placement,
}: TooltipComponentType) {
  return (
    <div>
      {children}
    </div>
  );
}
