import { Button, List, ListItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import PasswordPost from '../../components/passwordPost';
import PasswordItem from '../../components/passwordItem';
const PasswordPage = () =>
{
    const [showCreate, setShowCreate] = useState(false);
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <List>
                        <ListItem>
                            <PasswordItem data={{
                                "id": "00001",
                                "userName": "test",
                                "password": "123456",
                                "config": {
                                    "needUpperCaseAndLowerCase": true,
                                    "needSpecialChar": true,
                                    "needNumbers": true,
                                    "length": 12
                                }
                            }}></PasswordItem>
                        </ListItem>
                    </List>
                </Grid>
                <Grid size={2} sx={{ justifyContent: "center", display: "flex" }}>
                    <Button variant='contained' fullWidth onClick={() => setShowCreate(true)}>新建</Button>
                </Grid>
            </Grid>
            <PasswordPost open={showCreate} onClose={() => setShowCreate(false)} isEdit={false} />
        </>
    )
}

export default PasswordPage;