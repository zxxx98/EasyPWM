import
{
  Box,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Grid2 as Grid,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { IUser, Role } from '../../interfaces';
import { useEffect, useState } from 'react';
import { addUser, deleteUser, getUsers, updateUser } from '../../utils/net';
import { nanoid } from 'nanoid';
import { FieldValues, FormContainer, RadioButtonGroup, TextFieldElement } from 'react-hook-form-mui';
import message from '../../components/message';
import { useUser } from '../../contexts/UserContext';

const UserManagementPage = () =>
{
  const [users, setUsers] = useState<IUser[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  const isAdmin = user.role === 'admin';
  useEffect(() =>
  {
    getUsers().then(users => setUsers(users));
  }, []);

  const onEditUser = (user: IUser) =>
  {
    updateUser(user).then(() =>
    {
      message.success('更新成功');
      setUsers(users.map(u => u.id === user.id ? user : u));
    });
  };

  const onDeleteUser = (user: IUser) =>
  {
    deleteUser(user.id).then(() =>
    {
      setUsers(users.filter(u => u.id !== user.id));
      message.success('删除成功');
    });
  };

  const onSubmit = (data: FieldValues) =>
  {
    const user: IUser = {
      id: nanoid(),
      name: data.name,
      password: data.password,
      role: data.role as Role,
      tokens: [],
      systemConfig: {
        language: "zh",
        cloudType: "cloudflare",
        cloudflareConfig: {
          accountId: "",
          apiKey: "",
          namespace: "",
        },
        autoSyncToCloud: false,
      },
    };
    addUser(user).then(() =>
    {
      setUsers([...users, user]);
      message.success('创建成功');
    });
  };

  return (
    <Box sx={{ p: 2, }}>
      {/* 创建成员表单 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormContainer onSuccess={onSubmit} defaultValues={{
            role: 'user',
            name: '',
            password: '',
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>创建成员</h3>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextFieldElement label="用户名" name="name" sx={{ maxWidth: 300 }} />
              </Grid>
              <Grid size={12}>
                <TextFieldElement label="密码" type="password" name="password" sx={{ maxWidth: 300 }} />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <RadioButtonGroup label='身份' row name="role" options={[{
                label: 'User',
                value: 'user',
                id: 'user',
              }, {
                label: 'Admin',
                value: 'admin',
                id: 'admin',
              }]} />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{ maxWidth: 100 }}
              disabled={!isAdmin}
            >
              创建
            </Button>
          </FormContainer>
        </Box>
      </Paper>

      {/* 成员列表 */}
      <Paper>
        <h3 style={{ margin: '16px 16px 8px 16px' }}>成员列表</h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="10%">身份</TableCell>
                <TableCell width="30%">用户名</TableCell>
                <TableCell width="30%">密码</TableCell>
                <TableCell width="10%">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{isEditing ? <Select defaultValue={row.role} size="small" sx={{ maxWidth: 100 }} onChange={(e) =>
                  {
                    row.role = e.target.value as Role;
                  }}>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select> : row.role}</TableCell>
                  <TableCell>{isEditing ? <TextField size="small" defaultValue={row.name} onChange={(e) => row.name = e.target.value} /> : row.name}</TableCell>
                  <TableCell>{isEditing ? <TextField size="small" defaultValue={row.password} onChange={(e) => row.password = e.target.value} /> : row.password}</TableCell>
                  <TableCell>
                    {isEditing ? <>
                      <IconButton onClick={() =>
                      {
                        setIsEditing(false);
                        onEditUser(row);
                      }}>
                        <SaveIcon color='primary' />
                      </IconButton>
                      <IconButton onClick={() =>
                      {
                        setIsEditing(false);
                      }}>
                        <CancelIcon color='error' />
                      </IconButton>
                    </> :
                      <Box>
                        <IconButton
                          size="small"
                          onClick={(e) =>
                          {
                            e.stopPropagation();
                            setAnchorEl(e.currentTarget);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={() => setAnchorEl(null)}
                        >
                          <MenuItem disabled={!isAdmin} onClick={() =>
                          {
                            setAnchorEl(null);
                            setIsEditing(true);
                          }}>
                            编辑
                          </MenuItem>
                          <MenuItem disabled={!isAdmin} onClick={() =>
                          {
                            setAnchorEl(null);
                            onDeleteUser(row);
                          }}>
                            删除
                          </MenuItem>
                        </Menu>
                      </Box>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserManagementPage;