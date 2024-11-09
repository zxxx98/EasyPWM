import { useEffect, useState } from 'react';
import
{
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { readLocalStorage, writeLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import message from '../../components/message';
import { login } from '../../utils/net';
import { IUser } from '../../interfaces';
import { useUser } from '../../contexts/UserContext';

const LoginPage = () =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const handleSubmit = async (e: any) =>
    {
        e.preventDefault();
        try {
            // 这里添加你的登录 API 调用
            const user: IUser = await login(username, password);
            if (user) {
                // 假设登录成功，保存 token, token是用户信息里面最后一个
                const tokenInfo = user.tokens[user.tokens.length - 1];
                writeLocalStorage('token', tokenInfo.token);
                // 如果记住密码，可以保存相关信息
                if (rememberMe) {
                    writeLocalStorage('rememberedInfo', { username, password }, JSON.stringify);
                }
                setUser(user);
                // 登录成功后跳转到首页
                navigate('/');
            } else {
                message.error('密码错误');
            }
        } catch (error) {
            // 处理登录错误
            console.error('登录失败:', error);
            message.error('登录失败');
        }
    };

    useEffect(() =>
    {
        //读取本地记住的用户名和密码
        const rememberedInfo = readLocalStorage('rememberedInfo', JSON.parse);
        if (rememberedInfo) {
            setUsername(rememberedInfo.username);
            setPassword(rememberedInfo.password);
            setRememberMe(true);
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        登录
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="用户名"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="密码"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                            }
                            label="记住密码"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            登录
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage;