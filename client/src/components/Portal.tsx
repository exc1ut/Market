import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const containerElement = document.createElement('div');

  let externalWindow: Window | null;

  useEffect(() => {
    externalWindow = window.open('', 'modal');
    externalWindow?.document.body.appendChild(containerElement);
    return () => {
      externalWindow?.close();
    };
  }, []);

  return createPortal(children, containerElement);
};
