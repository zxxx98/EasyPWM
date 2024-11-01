import {
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
  } from '@mui/material';
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  
  const UserManagementPage = () => {
    // 模拟表格数据
    const tableData = [
      { id: 1, role: 'Host', username: 'zhouxin', nickname: 'zhouxin', status: '您自己' },
      { id: 2, role: 'User', username: 'xiaodi', nickname: 'xiaodi', status: '' },
    ];
  
    return (
      <Box sx={{ p: 2 }}>
        {/* 创建成员表单 */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <h3 style={{ margin: '0 0 16px 0' }}>创建成员</h3>
            
            <TextField
              label="用户名"
              size="small"
              sx={{ maxWidth: 300 }}
            />
            
            <TextField
              label="密码"
              type="password"
              size="small"
              sx={{ maxWidth: 300 }}
            />
            
            <Box>
              <div style={{ marginBottom: '8px' }}>身份</div>
              <RadioGroup row defaultValue="User">
                <FormControlLabel value="User" control={<Radio />} label="User" />
                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
              </RadioGroup>
            </Box>
  
            <Button 
              variant="contained" 
              sx={{ maxWidth: 100 }}
            >
              创建
            </Button>
          </Box>
        </Paper>
  
        {/* 成员列表 */}
        <Paper>
          <h3 style={{ margin: '16px 16px 8px 16px' }}>成员列表</h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>身份</TableCell>
                  <TableCell>用户名</TableCell>
                  <TableCell>昵称</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.nickname}</TableCell>
                    <TableCell>
                      {row.status ? (
                        row.status
                      ) : (
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      )}
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