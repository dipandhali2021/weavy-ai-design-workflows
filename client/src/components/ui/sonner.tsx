'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = (props: ToasterProps) => {
  const style = {
    '--normal-bg': 'var(--popover)',
    '--normal-text': 'var(--popover-foreground)',
    '--normal-border': 'var(--border)',
  } as unknown as ToasterProps['style'];

  return <Sonner className="toaster group" style={style} {...props} />;
};

export { Toaster };
