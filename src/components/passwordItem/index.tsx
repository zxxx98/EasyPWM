import { Button, IconButton, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { IPassword } from '../../interfaces';
import EditIcon from '@mui/icons-material/Edit';

const PasswordItem: React.FC<{ data: IPassword }> = ({ data }) =>
{
    return <Grid container>
        <Grid size={5}>
            <div style={{ marginBottom: '8px' }}>用户名</div>
            <TextField value={data.userName} />
        </Grid>
        <Grid size={5}>
            <div style={{ marginBottom: '8px' }}>密码</div>
            <TextField value={data.password} />
        </Grid>
        <Grid size={2}>
            <IconButton aria-label="delete">
                <EditIcon />
            </IconButton>
        </Grid>
    </Grid>
}

export default PasswordItem;