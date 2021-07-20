import electron from 'electron';
import { PosPrintData, PosPrintOptions } from 'electron-pos-printer';

export const getAllPrinterNames = () => {
  const activeContents = electron.remote.webContents.getFocusedWebContents();
  const printers = activeContents.getPrinters();
  const names = printers.map((val) => val.name);
  return names;
};

export const printToPrinter = (printerName: string, data: PosPrintData[]) => {
  const { PosPrinter } = require('electron').remote.require(
    'electron-pos-printer'
  );

  const options: PosPrintOptions = {
    preview: false, // Preview in window or print
    width: '170px', //  width of content body
    margin: '0 0 0 0', // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  PosPrinter.print(data, options)
    .then(() => {})
    .catch((error: any) => {
      console.error(error);
    });
};
