import
{
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
import { IToken } from '../../interfaces';
import { updateUser } from '../../utils/net';
import message from '../message';
import { useUser } from '../../contexts/UserContext';
const AccessTokenPage = () =>
{
  const { user, setUser } = useUser();

  const onDeleteToken = (token: IToken) =>
  {
    const tokens = user.tokens.filter(t => t.token !== token.token);
    const newUser = { ...user, tokens };
    updateUser(newUser).then(() =>
    {
      message.success('删除成功');
      setUser(newUser);
    });
  };

  const copyToClipboard = (text: string) =>
  {
    navigator.clipboard.writeText(text);
    message.success('复制成功');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Access Tokens</Typography>
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
            {user.tokens.map((token) => (
              <TableRow key={token.token}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {token.token}
                    <IconButton size="small" onClick={() => copyToClipboard(token.token)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>{token.description}</TableCell>
                <TableCell>{new Date(token.createTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(token.deleteTime).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" size="small" onClick={() => onDeleteToken(token)}>
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