import { Box } from '@chakra-ui/layout';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { JournalPayments } from './JournalPayments';
import { JournalProucts } from './JournalProucts';
import { JournalReturns } from './JournalReturns';

interface JournalTabsProps {}

export const JournalTabs: React.FC<JournalTabsProps> = ({}) => {
  return (
    <Box py={3}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Список товаров</Tab>
          <Tab>Платежи</Tab>
          <Tab>Возраты</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <JournalProucts />
          </TabPanel>
          <TabPanel>
            <JournalPayments />
          </TabPanel>
          <TabPanel>
            <JournalReturns />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
