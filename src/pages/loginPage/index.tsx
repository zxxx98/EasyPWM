import { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { writeLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import message from '../../components/message';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            // 这里添加你的登录 API 调用
            // const response = await loginApi(username, password);

            // 假设登录成功，保存 token
            const token = 'your-token-here';
            writeLocalStorage('token', token);

            // 如果记住密码，可以保存相关信息
            if (rememberMe) {
                writeLocalStorage('rememberedInfo', { username, password }, JSON.stringify);
            }

            // 登录成功后跳转到首页
            navigate('/');
        } catch (error) {
            console.error('登录失败:', error);
            message.error('登录失败');
            // 处理登录错误
        }
    };

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