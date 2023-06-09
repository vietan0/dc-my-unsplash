import { func, node } from 'prop-types';
import { useEffect } from 'react';

export default function Popup({ setPopupOpen, children }) {
  // close popup handlers
  const preventBubbling = (e) => e.stopPropagation();
  const handlePressEsc = (e) => e.key === 'Escape' && setPopupOpen(false);

  useEffect(() => {
    window.addEventListener('keydown', handlePressEsc);
    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-20 bg-gray-950/80"
      onClick={(e) => {
        preventBubbling(e);
        setPopupOpen(false);
      }}
    >
      <div
        onClick={preventBubbling}
        className="absolute inset-0 mx-4 my-auto flex h-min max-h-[90vh] min-w-min max-w-3xl flex-col gap-4 rounded-xl bg-slate-50 p-4 xs:p-6 dark:bg-slate-900 xs:mx-8 sm:mx-auto sm:w-[80vw]"
      >
        {children}
      </div>
    </div>
  );
}

Popup.propTypes = {
  setPopupOpen: func.isRequired,
  children: node.isRequired,
};
