import { Textfit } from 'react-textfit';

const Screen = ({ value }: { value: string | number }) => {
  return (
    <Textfit
      mode='single'
      max={70}
      className='h-20 rounded-lg bg-gray-700 flex flex-row-reverse items-center pe-3 text-5xl font-semibold text-white'
    >
      {value}
    </Textfit>
  );
};

export default Screen;
