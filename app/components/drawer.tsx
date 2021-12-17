import React from 'react';

interface IDrawer {
  right: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

/**
 * Drawer component zIndex - 50
 * @param props Drawer props
 * @param props.right Drawer position
 * @param props.isOpen Drawer state
 * @param props.setIsOpen Drawer function to change state
 * @param props.children Drawer children
 * @returns
 */
export const Drawer = ({ right, isOpen, setIsOpen, children }: IDrawer) => {
  let align = 'left-0';
  if (right) {
    align = 'right-0';
  }
  let displayClass = '-translate-x-[300px]';
  if (isOpen) {
    displayClass = 'translate-x-0';
  }
  let overlayClass = 'hidden';
  if (isOpen) {
    overlayClass = 'block';
  }
  return (
    <>
      <div
        className={`bg-neutral opacity-5 h-[100vh] w-[100vw] z-40 fixed top-0 left-0 ${overlayClass}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed top-0 ${align} bg-neutral z-50 min-h-[100vh] max-w-[300px] w-[60vw] transition-transform ease-in-out ${displayClass}`}
      >
        <div className='mx-5 mt-5 flex flex-col h-[95vh]'>{children}</div>
      </div>
    </>
  );
};

interface IDrawerContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const DrawerContext = React.createContext<IDrawerContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DrawerContext.Provider value={{ setIsOpen, isOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => React.useContext(DrawerContext);
