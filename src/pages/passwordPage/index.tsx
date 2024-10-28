import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
const PasswordPage = () => {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <div>111</div>
                </Grid>
                <Grid size={2} sx={{ justifyContent: "center", display: "flex" }}>
                    <Button variant='contained' fullWidth onClick={() => setShowCreate(true)}>新建</Button>
                </Grid>
            </Grid>
            {showCreate && <div>222</div>}
        </>
    )
}

export default PasswordPage;