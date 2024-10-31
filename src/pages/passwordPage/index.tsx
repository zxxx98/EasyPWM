import { Box, Button, Collapse, IconButton, InputAdornment, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Fragment, useEffect, useState } from 'react';
import PasswordPost from '../../components/passwordPost';
import { IPassword } from '../../interfaces';
import { deletePassword, getPasswordList } from '../../utils/net';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import message from '../../components/message';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
const PasswordRow = ({ row, onDelete, setShowEdit }: { row: IPassword, onDelete: (id: string) => void, setShowEdit: (data: { open: boolean, isEdit: boolean, data?: IPassword }) => void }) =>
{
    const [open, setOpen] = useState(false);
    const onClipboard = (text: string) =>
    {
        navigator.clipboard.writeText(text);
        message.success("复制成功");
    }
    return <Fragment>
        <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell>
                {row.domain && (
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${row.domain}`}
                        alt=""
                        style={{
                            width: 16,
                            height: 16,
                            verticalAlign: 'middle'
                        }}
                    />
                )}
            </TableCell>
            <TableCell component="th" scope="row" onClick={() => onClipboard(row.userName)} style={{ cursor: 'pointer' }}>
                {row.userName}
            </TableCell>
            <TableCell align="left" onClick={() => onClipboard(row.password)} style={{ cursor: 'pointer' }}>
                {row.password}
            </TableCell>
            <TableCell align="center">
                <IconButton onClick={() =>
                {
                    setShowEdit({ open: true, isEdit: true, data: row });
                }}>
                    <EditIcon />
                </IconButton >
                <IconButton color="error" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                </IconButton >
            </TableCell>
        </TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography fontSize={16} variant='h6' gutterBottom component="div">
                        备注
                    </Typography>
                    <Typography fontSize={14} style={{ whiteSpace: 'pre-line' }}>
                        {row.remark}
                    </Typography>
                </Box>
            </Collapse>
        </TableCell>
    </Fragment>
}

const PasswordPage = () =>
{
    const [passwordList, setPasswordList] = useState<IPassword[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchList, setSearchList] = useState<IPassword[]>([]);
    const [showEdit, setShowEdit] = useState<{ open: boolean, isEdit: boolean, data?: IPassword }>({ open: false, isEdit: false });
    useEffect(() =>
    {
        getPasswordList().then(lists =>
        {
            setPasswordList(lists);
        });
    }, []);

    const onDelete = (id: string) =>
    {
        deletePassword(id).then(() =>
        {
            getPasswordList().then(setPasswordList);
        });
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = e.target.value;
        setSearchTerm(value);
        const filteredList = passwordList.filter((row) =>
            row.userName.includes(value) || row.domain?.includes(value)
        );
        setSearchList(filteredList);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <List>
                        <ListItem>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="搜索用户名或备注..."
                                value={searchTerm}
                                onChange={onSearch}
                                sx={{ mb: 2 }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <TableContainer >
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell width={"30%"}><Typography fontSize={16} variant='h6'>用户名</Typography></TableCell>
                                            <TableCell width={"30%"}><Typography fontSize={16} variant='h6'>密码</Typography></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(searchTerm ? searchList : passwordList).map((row) =>
                                            <PasswordRow row={row} onDelete={onDelete} setShowEdit={setShowEdit} />)}
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