import { childrenProps } from './types';

const ButtonBox = ({ children }: childrenProps) => {
  return <div className='grid grid-cols-4 gap-2 mt-2'>{children}</div>;
};

export default ButtonBox;
