import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import ContentCopyIcon from '@mui/icons-material/ContentCopy';
  import AddIcon from '@mui/icons-material/Add';
  
  interface Token {
    id: string;
    description: string;
    createdAt: string;
    expiresAt: string;
  }
  
  const AccessTokenPage = () => {
    const tokens: Token[] = [
      {
        id: 'eyJh****pqKo',
        description: 'user login',
        createdAt: '2024/10/26 11:18:57',
        expiresAt: '2124/10/2 11:18:57'
      },
      // ... 其他 token 数据
    ];
  
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Access Tokens</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
          >
            创建
          </Button>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A list of all access tokens for your account.
        </Typography>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Expires At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {token.id}
                      <IconButton size="small">
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{token.description}</TableCell>
                  <TableCell>{token.createdAt}</TableCell>
                  <TableCell>{token.expiresAt}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default AccessTokenPage;