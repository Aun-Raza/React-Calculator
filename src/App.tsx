import { useState } from 'react';
import './App.css';
import Screen from './components/Screen.tsx';
import Wrapper from './components/Wrapper.tsx';
import ButtonBox from './components/ButtonBox.tsx';
import Button from './components/Button.tsx';

function App() {
  const [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  const btnValues = [
    [
      { key: 'C', func: (key: string) => resetClickHandler(key) },
      { key: '+-', func: (key: string) => invertClickHandler(key) },
      { key: '%', func: (key: string) => percentClickHandler(key) },
      { key: '/', func: (key: string) => signClickHandler(key) },
    ],
    [
      { key: '7', func: (key: string) => numClickHandler(key) },
      { key: '8', func: (key: string) => numClickHandler(key) },
      { key: '9', func: (key: string) => numClickHandler(key) },
      { key: 'X', func: (key: string) => signClickHandler(key) },
    ],
    [
      { key: '4', func: (key: string) => numClickHandler(key) },
      { key: '5', func: (key: string) => numClickHandler(key) },
      { key: '6', func: (key: string) => numClickHandler(key) },
      { key: '-', func: (key: string) => signClickHandler(key) },
    ],
    [
      { key: '1', func: (key: string) => numClickHandler(key) },
      { key: '2', func: (key: string) => numClickHandler(key) },
      { key: '3', func: (key: string) => numClickHandler(key) },
      { key: '+', func: (key: string) => signClickHandler(key) },
    ],
    [
      { key: '0', func: (key: string) => numClickHandler(key) },
      { key: '.', func: (key: string) => decimalClickHandler(key) },
      { key: '=', func: (key: string) => equalClickHandler(key) },
    ],
  ];

  function resetClickHandler(key: string) {
    console.log(key, 'resetClickHandler');

    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    });
  }

  function invertClickHandler(key: string) {
    console.log(key, 'invertClickHandler');

    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: '',
    });
  }

  function percentClickHandler(key: string) {
    console.log(key, 'percentClickHandler');

    let num = calc.num ? calc.num : 0;
    let res = calc.res ? calc.res : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: '',
    });
  }

  function equalClickHandler(key: string) {
    console.log(key, 'equalClickHandler');

    if (calc.sign && calc.num) {
      const math = (a: number, b: number, sign: string) =>
        sign === '+'
          ? a + b
          : sign === '-'
          ? a - b
          : sign === 'X'
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === '/'
            ? -1
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: '',
        num: 0,
      });
    }
  }

  function signClickHandler(key: string) {
    console.log(key, 'signClickHandler');

    setCalc({
      ...calc,
      sign: key,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  }

  function decimalClickHandler(key: string) {
    console.log(key, 'decimalClickHandler');

    if (calc.num.toString().includes('.')) {
      // if calc.num already has a decimal, don't add another
      return;
    }

    // Convert calc.num to string, add the decimal, then convert back to number
    const newNum = parseFloat(calc.num.toString() + key);
    console.log(newNum);

    setCalc({
      ...calc,
      num: newNum,
    });
  }

  function numClickHandler(key: string) {
    console.log(key, 'numClickHandler');

    if (calc.num.toString().length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && key === '0'
            ? 0
            : calc.num % 1 === 0
            ? Number(calc.num + key)
            : calc.num + Number(key),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btnValue) => {
          const { key, func } = btnValue;
          return (
            <Button
              key={key}
              className={key === '=' ? 'col-span-2 bg-red-500' : ''}
              value={key}
              onFunc={func}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
