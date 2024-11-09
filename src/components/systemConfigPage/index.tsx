
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useState } from "react";
import { ISystemConfig, Language } from "../../interfaces";
import { useUser } from "../../contexts/UserContext";
import { getPasswordList, updateUser } from "../../utils/net";
import message from "../message";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import GoogleIcon from '@mui/icons-material/Google';
import { exportPasswordList, importLocalConfig } from "../../utils/file";

const SystemConfigPage = () =>
{
    const { user } = useUser();
    const [systemConfig, setSystemConfig] = useState<ISystemConfig>(user.systemConfig);
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>系统配置</Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>语言设置</Typography>
                <FormControl fullWidth>
                    <InputLabel>语言</InputLabel>
                    <Select
                        value={systemConfig.language}
                        label="语言"
                        onChange={(e) =>
                        {
                            const newSystemConfig = { ...systemConfig };
                            newSystemConfig.language = e.target.value as Language;
                            setSystemConfig(newSystemConfig);
                            const newUser = { ...user };
                            newUser.systemConfig = newSystemConfig;
                            updateUser(newUser).then(() =>
                            {
                                message.success('保存成功');
                            });
                        }}
                    >
                        <MenuItem value="zh">中文</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel>主题模式</InputLabel>
                    <Select
                        value={"light"}
                        label="主题模式"
                        onChange={(e) =>
                        {
                        }}
                    >
                        <MenuItem value="light">亮色模式</MenuItem>
                        <MenuItem value="dark">暗色模式</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" sx={{ mt: 2 }} fullWidth startIcon={<UploadFileIcon />} onClick={() =>
                {
                    importLocalConfig(user.id).then(() =>
                    {
                        message.success('导入成功');
                    });
                }}>
                    导入本地配置
                </Button>
                <Button variant="outlined" sx={{ mt: 2 }} fullWidth startIcon={<DownloadIcon />} onClick={() =>
                {
                    getPasswordList(user.id).then(passwordList =>
                    {
                        exportPasswordList(passwordList);
                    });
                }}>
                    导出本地配置
                </Button>
                <Button variant="outlined" sx={{ mt: 2 }} fullWidth startIcon={<GoogleIcon />}>
                    同步谷歌密码管理器
                </Button>
            </Paper>
        </Box>
    )
};

export default SystemConfigPage;