import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, IconButton, Slider, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FieldValues, FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import { MouseEvent, useEffect, useState } from "react";
import { generate } from 'generate-password-browser';
import { IPassword } from '../../interfaces';
import { nanoid } from 'nanoid';
import { addPassword, updatePassword } from "../../utils/net";
import message from "../message";

const PasswordPost = ({ open, onClose, isEdit, data }: { open: boolean, onClose: () => void, isEdit: boolean, data?: IPassword }) =>
{
    const formContext = useForm();
    const [passwordGenerate, setPasswordGenerate] = useState({
        needUpperCaseAndLowerCase: true,
        needSpecialChar: true,
        needNumbers: true,
        length: 12
    });
    const generatePassword = (e: MouseEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();
        const passwordConfig = {
            length: passwordGenerate.length,
            numbers: passwordGenerate.needNumbers,
            symbols: passwordGenerate.needSpecialChar
        };
        if (passwordGenerate.needUpperCaseAndLowerCase) {
            Object.assign(passwordConfig, {
                uppercase: true,
                lowercase: true
            });
        }
        const password = generate(passwordConfig);
        //设置表单的数据
        formContext.setValue('password', password);
    }

    const onSubmit = async (formData: FieldValues) =>
    {
        const password: IPassword = {
            id: isEdit ? data!.id : nanoid(),
            userName: formData.username,
            password: formData.password,
            domain: formData.domain,
            remark: formData.remark,
            config: passwordGenerate
        };
        const result = isEdit ? await updatePassword(password) : await addPassword(password);
        if (result) {
            message.success(`${isEdit ? "编辑" : "添加"}成功`);
            onClose();
        } else {
            message.error(`${isEdit ? "编辑" : "添加"}失败`);
        }
    }

    useEffect(() =>
    {
        if (data) {
            formContext.setValue('username', data.userName);
            formContext.setValue('password', data.password);
            formContext.setValue('domain', data.domain);
            formContext.setValue('remark', data.remark);
            setPasswordGenerate(data.config);
        }
    }, [data]);

    return <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? "编辑密码" : "新建密码"}</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
        >
            <CloseIcon />
        </IconButton>
        <FormContainer
            formContext={formContext}
            onSuccess={data =>
            {
                onSubmit(data);
            }}
        >
            <DialogContent>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>用户名 <span style={{ color: 'red' }}>*</span></div>
                    <TextFieldElement
                        autoFocus
                        id="username"
                        name="username"
                        type="text"
                        fullWidth
                        required
                        variant="outlined"

                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>密码 <span style={{ color: 'red' }}>*</span></div>
                    <TextFieldElement
                        required
                        id="password"
                        name="password"
                        type={'text'}
                        fullWidth
                        variant="outlined"
                        slotProps={{
                            input: {
                                endAdornment: <IconButton onClick={(e) =>
                                {
                                    generatePassword(e);
                                }}><RefreshIcon /></IconButton>
                            }
                        }}
                    />
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked={passwordGenerate.needUpperCaseAndLowerCase} onChange={() => setPasswordGenerate({ ...passwordGenerate, needUpperCaseAndLowerCase: !passwordGenerate.needUpperCaseAndLowerCase })} />} label="大小写" />
                        <FormControlLabel control={<Checkbox checked={passwordGenerate.needSpecialChar} onChange={() => setPasswordGenerate({ ...passwordGenerate, needSpecialChar: !passwordGenerate.needSpecialChar })} />} label="特殊字符" />
                        <FormControlLabel control={<Checkbox checked={passwordGenerate.needNumbers} onChange={() => setPasswordGenerate({ ...passwordGenerate, needNumbers: !passwordGenerate.needNumbers })} />} label="数字" />
                    </FormGroup>
                    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div>密码长度</div>
                        <Slider sx={{ ml: 2, mr: 2, flex: 1 }} defaultValue={12} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>域</div>
                    <TextFieldElement
                        placeholder="https://xxxxxx"
                        id="domain"
                        name="domain"
                        type="url"
                        fullWidth
                        variant="outlined"

                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>备注</div>
                    <TextFieldElement
                        multiline
                        rows={4}
                        id="remark"
                        name="remark"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </div>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                <Button type="submit" sx={{ width: "20%" }} variant="contained" autoFocus>
                    确定
                </Button>
            </DialogActions>
        </FormContainer>
    </Dialog>
}

export default PasswordPost;    