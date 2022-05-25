import { FC, ReactNode, createContext, Dispatch, SetStateAction, useState, useContext } from 'react';

const mouseContext = createContext<boolean | undefined>(undefined);
const setMouseContext = createContext<Dispatch<SetStateAction<boolean | undefined>>>(() => undefined);

const MouseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOver, setIsOver] = useState<boolean | undefined>(undefined);

  return (
    <mouseContext.Provider value={isOver}>
      <setMouseContext.Provider value={setIsOver}>{children}</setMouseContext.Provider>
    </mouseContext.Provider>
  );
};

const useIsOver = () => useContext(mouseContext);
const useSetIsOver = () => useContext(setMouseContext);

export default MouseProvider;
export { useIsOver, useSetIsOver };
