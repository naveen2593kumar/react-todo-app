import { FC, useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import { IMessage } from "../../model/message";

interface IMessageProps {
    message: IMessage;
}

/**
 * This is a Toast/Snackbar kind of message to show the app changes
 */
const Message: FC<IMessageProps> = ({ message }) => {
    const [open, setOpen] = useState(true);

    const handleSnackabarClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        // show the snackbar each time whenever message prop changes
        setOpen(true);
    }, [message])

    return (
        <Snackbar open={open} autoHideDuration={2500} onClose={handleSnackabarClose}>
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleSnackabarClose}
                severity={message.type}>
                {message.text}
            </Alert>
        </Snackbar>
    );
}
export default Message;