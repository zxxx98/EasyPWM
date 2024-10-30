import { Button, IconButton, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import PasswordPost from '../../components/passwordPost';
import PasswordItem from '../../components/passwordItem';
import { IPassword } from '../../interfaces';
import { deletePassword, getPasswordList } from '../../utils/net';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const PasswordPage = () =>
{
    const [passwordList, setPasswordList] = useState<IPassword[]>([]);
    const [showEdit, setShowEdit] = useState<{ open: boolean, isEdit: boolean, data?: IPassword }>({ open: false, isEdit: false });
    useEffect(() =>
    {
        getPasswordList().then(lists =>
        {
            setPasswordList(lists);
        });
    }, []);

    const handleDelete = (id: string) =>
    {
        deletePassword(id).then(() =>
        {
            getPasswordList().then(setPasswordList);
        });
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <List>
                        <ListItem>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={"30%"}>用户名</TableCell>
                                            <TableCell width={"50%"}>密码</TableCell>
                                            <TableCell width={"20%"}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {passwordList.map((row) => <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.userName}
                                            </TableCell>
                                            <TableCell align="left">{row.password}</TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() =>
                                                {
                                                    setShowEdit({ open: true, isEdit: true, data: row });
                                                }}>
                                                    <EditIcon />
                                                </IconButton >
                                                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton >
                                            </TableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ListItem>
                    </List>
                </Grid>
                <Grid size={2} sx={{ justifyContent: "center", display: "flex" }}>
                    <Button sx={{ height: 40 }} variant='contained' fullWidth onClick={() => setShowEdit({ open: true, isEdit: false })}>新建</Button>
                </Grid>
            </Grid>
            <PasswordPost open={showEdit.open} onClose={() =>
            {
                setShowEdit({ open: false, isEdit: false });
                getPasswordList().then(setPasswordList);
            }} isEdit={showEdit.isEdit} data={showEdit.data} />
        </>
    )
}

export default PasswordPage;