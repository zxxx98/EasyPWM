import { Button, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { Box, Stack, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GoogleIcon from '@mui/icons-material/Google';
import EditIcon from '@mui/icons-material/Edit';

const SystemConfigPage = () =>
{
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>系统配置</Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>语言设置</Typography>
                <FormControl fullWidth>
                    <InputLabel>语言</InputLabel>
                    <Select
                        value="zh"
                        label="语言"
                    >
                        <MenuItem value="zh">中文</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </FormControl>
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>数据同步</Typography>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>云盘选择</InputLabel>
                            <Select
                                value=""
                                label="云盘选择"
                            >
                                <MenuItem value="google">Google Drive</MenuItem>
                                <MenuItem value="onedrive">OneDrive</MenuItem>
                                <MenuItem value="dropbox">Dropbox</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography sx={{ flex: 1 }}>未配置云盘</Typography>
                        <IconButton size="small">
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <FormControlLabel control={<Checkbox />} label="同步到云端" />
                    <Button variant="outlined" startIcon={<UploadFileIcon />}>
                        导入本地配置
                    </Button>
                    <Button variant="outlined" startIcon={<GoogleIcon />}>
                        同步谷歌密码管理器
                    </Button>
                </Stack>
            </Paper>
        </Box>
    )
};

export default SystemConfigPage;