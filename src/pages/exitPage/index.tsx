import { Box, Typography } from "@mui/material";

import { Button } from "@mui/material";

const ExitPage = () =>
{
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                确定要退出吗？
            </Typography>

            <Button
                variant="contained"
                color="error"
                size="large"
                onClick={() =>
                {
                    localStorage.clear();
                    window.location.href = '/login';
                }}
                sx={{
                    minWidth: 200,
                    py: 2,
                    fontSize: '1.2rem'
                }}
            >
                退出登录
            </Button>
        </Box>
    )
};

export default ExitPage;