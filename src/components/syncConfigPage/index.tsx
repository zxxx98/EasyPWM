import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Box, Stack, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from "react";
import { CloudType, ISyncConfig } from "../../interfaces";
import { getConfigLocal, saveConfigLocal } from "../../utils/net";
import message from "../message";

const SyncConfigPage = () =>
{
    const [syncConfig, setSyncConfig] = useState<ISyncConfig>({
        cloudType: "cloudflare",
        cloudflareConfig: { accountId: "", apiKey: "", namespace: "" },
        autoSyncToCloud: false
    });
    useEffect(() =>
    {
        getConfigLocal().then((res) =>
        {
            setSyncConfig(res);
        });
    }, []);
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>数据同步</Typography>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>云储存选择</InputLabel>
                            <Select
                                value={syncConfig.cloudType}
                                label="云储存选择"
                                onChange={(e) =>
                                {
                                    const newSyncConfig = { ...syncConfig };
                                    newSyncConfig.cloudType = e.target.value as CloudType;
                                    setSyncConfig(newSyncConfig);
                                }}
                            >
                                <MenuItem value="cloudflare">Cloudflare</MenuItem>
                                <MenuItem value="google">Google Drive</MenuItem>
                                <MenuItem value="onedrive">OneDrive</MenuItem>
                                <MenuItem value="dropbox">Dropbox</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            syncConfig.cloudType === "cloudflare" &&
                            <React.Fragment>
                                <TextField sx={{ flex: 1 }} label="Cloudflare Account ID" onChange={(e) =>
                                {

                                    const newSyncConfig = { ...syncConfig };
                                    newSyncConfig.cloudflareConfig.accountId = e.target.value;
                                    setSyncConfig(newSyncConfig);
                                }} value={syncConfig?.cloudflareConfig?.accountId} />
                                <TextField sx={{ flex: 1 }} label="Cloudflare API Key" onChange={(e) =>
                                {

                                    const newSyncConfig = { ...syncConfig };
                                    newSyncConfig.cloudflareConfig.apiKey = e.target.value;
                                    setSyncConfig(newSyncConfig);
                                }} value={syncConfig?.cloudflareConfig?.apiKey} />
                                <TextField sx={{ flex: 1 }} label="Cloudflare Namespace" onChange={(e) =>
                                {

                                    const newSyncConfig = { ...syncConfig };
                                    newSyncConfig.cloudflareConfig.namespace = e.target.value;
                                    setSyncConfig(newSyncConfig);
                                }} value={syncConfig?.cloudflareConfig?.namespace} />
                            </React.Fragment>
                        }

                    </Box>
                    <FormControlLabel control={<Checkbox checked={syncConfig?.autoSyncToCloud} onChange={(e) =>
                    {

                        const newSyncConfig = { ...syncConfig };
                        newSyncConfig.autoSyncToCloud = e.target.checked;
                        setSyncConfig(newSyncConfig);
                    }} />} label="自动同步到云端" />
                    <Button color="success" variant="contained" startIcon={<SaveIcon />} onClick={() =>
                    {

                        saveConfigLocal(syncConfig).then(() =>
                        {
                            message.success('保存成功');
                        });
                    }}>
                        保存
                    </Button>
                </Stack>
            </Paper>
        </Box>
    )
};

export default SyncConfigPage;