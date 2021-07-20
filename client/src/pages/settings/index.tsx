import { Button } from '@chakra-ui/button';
import { Select } from '@chakra-ui/select';
import React, { useState } from 'react';
import { getAllPrinterNames, printToPrinter } from '../../utils/printer';

interface indexProps {}

export const Settings: React.FC<indexProps> = ({}) => {
  const printerNames = getAllPrinterNames();
  const [state, setState] = useState(printerNames[0]);

  return (
    <>
      <Select onChange={(e) => setState(e.target.value)}>
        {printerNames.map((val) => (
          <option value={val}>{val}</option>
        ))}
      </Select>
    </>
  );
};
