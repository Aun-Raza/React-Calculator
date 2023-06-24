import { childrenProps } from './types';

const Wrapper = ({ children }: childrenProps) => {
  return (
    <div className='max-w-xs mx-auto mt-7 p-2 rounded-lg bg-gray-800'>
      {children}
    </div>
  );
};

export default Wrapper;
