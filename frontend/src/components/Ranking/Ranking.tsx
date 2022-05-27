import {
  Avatar,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo } from 'react';
import { useGetRankingQuery } from '../../rtk/api';

const Ranking = () => {
  const { data } = useGetRankingQuery(null);
  let fullnames: any = [];
  data?.forEach((film: any[]) =>
    film?.forEach((user) =>
      fullnames.push(`${user?.firstName} ${user?.lastName}`)
    )
  );
  const uniqueNames = new Set();
  fullnames.forEach((fullname: any) => uniqueNames.add(fullname));
  const uniqueFullNames = Array.from(uniqueNames);
  const TODO = uniqueFullNames.map((x: any) => ({
    fullname: x,
    count: fullnames.filter((fullname: any) => fullname === x).length,
  }));

  console.log('TODO', TODO);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TableContainer component={Paper} sx={{ width: '90%', maxWidth: 650 }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>User fullname</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TODO.map((user) => (
              <TableRow
                key={user.fullname}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {user.fullname}
                </TableCell>
                <TableCell>{user.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <List>
      {TODO.map((user: any) => {
        const A = user.fullname?.split(' ')[0][0];
        const B = user.fullname?.split(' ')[1][0];
        return (
          <ListItem>
            <Avatar>
              {A} {B}
            </Avatar>
            {user.fullname}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Ranking;
