import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import { ReactNode, useState } from 'react';
import PasswordPage from './pages/passwordPage';
import ConfigPage from './pages/configPage';
import UserManagementPage from './pages/userManagementPage';
import ExitPage from './pages/exitPage';

interface TabPanelProps
{
  children?: React.ReactNode;
  index: number;
}

const TabConfigs: {
  label: string,
  value: number,
  icon: string,
  component: ReactNode
}[] = [
    {
      label: '总览',
      value: 0,
      icon: "",
      component: <PasswordPage></PasswordPage>
    },
    {
      label: '用户',
      value: 1,
      icon: "",
      component: <UserManagementPage></UserManagementPage>
    },
    {
      label: '配置',
      value: 2,
      icon: "",
      component: <ConfigPage></ConfigPage>
    },
    {
      label: '退出',
      value: 3,
      icon: "",
      component: <ExitPage></ExitPage>
    },
  ]

function TabPanel(props: TabPanelProps)
{
  const { children } = props;

  return (
    <div
      role="tabpanel"
      style={{ flex: 1 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

function a11yProps(index: number)
{
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function App()
{
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
  {
    setValue(newValue);
  };
  return (
    <Container maxWidth="xl" sx={{ pt: 2 }}>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {TabConfigs.map((tabConfig, index) =>
          {
            return <Tab label={tabConfig.label} {...a11yProps(index)} key={index} />
          })}
        </Tabs>
        <TabPanel index={value} children={TabConfigs[value].component}></TabPanel>
      </Box>
    </Container>
  );
}
