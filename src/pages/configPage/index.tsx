import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";
import AccessTokenPage from "../../components/accessTokenPage";
import SystemConfigPage from "../../components/systemConfigPage";
import SyncConfigPage from "../../components/syncConfigPage";
import { useUser } from "../../contexts/UserContext";

const TabConfigs: {
    label: string,
    value: number,
    icon: string,
    component: ReactNode
}[] = [
        {
            label: '系统配置',
            value: 0,
            icon: '',
            component: <SystemConfigPage></SystemConfigPage>
        },
        {
            label: "Token配置",
            value: 1,
            icon: '',
            component: <AccessTokenPage></AccessTokenPage>
        }
    ]

const ConfigPage = () =>
{
    const { user } = useUser();
    const [value, setValue] = useState(0);
    const tabConfigs = user.role === 'admin' ? [...TabConfigs, {
        label: "同步配置",
        value: 2,
        icon: '',
        component: <SyncConfigPage></SyncConfigPage>
    }] : TabConfigs;
    return <Box>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
            {tabConfigs.map((tabConfig) => (
                <Tab key={tabConfig.value} label={tabConfig.label} icon={tabConfig.icon} value={tabConfig.value} />
            ))}
        </Tabs>
        <Box>
            {tabConfigs.find((tabConfig) => tabConfig.value === value)?.component}
        </Box>
    </Box>
};

export default ConfigPage;