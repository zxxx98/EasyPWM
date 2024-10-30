import { Alert, Snackbar } from '@mui/material';
import { createRoot } from 'react-dom/client';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageConfig
{
    message: string;
    type?: MessageType;
    duration?: number;
}

const Message = ({ message, type = 'info', duration = 3000, onClose }: MessageConfig & { onClose: () => void }) =>
{
    return (
        <Snackbar
            open={true}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={type} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

const message = {
    show: ({ message, type = 'info', duration = 3000 }: MessageConfig) =>
    {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const root = createRoot(div);

        const destroy = () =>
        {
            root.unmount();
            div.remove();
        };

        root.render(
            <Message
                message={message}
                type={type}
                duration={duration}
                onClose={destroy}
            />
        );
    },
    success: (msg: string) => message.show({ message: msg, type: 'success' }),
    error: (msg: string) => message.show({ message: msg, type: 'error' }),
    warning: (msg: string) => message.show({ message: msg, type: 'warning' }),
    info: (msg: string) => message.show({ message: msg, type: 'info' })
};

export default message; 