import { Box, Center } from '@chakra-ui/layout';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Password } from './Password';
import { Users } from './Users';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <Center h="100vh">
      <Box borderRadius={5} borderWidth={1} borderColor="gray.300" p={2}>
        <Switch>
          <Route exact path="/:id/:name">
            <Password />
          </Route>
          <Route path="/">
            <Users />
          </Route>
        </Switch>
      </Box>
    </Center>
  );
};
