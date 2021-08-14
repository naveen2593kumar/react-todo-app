import { IMessage } from "../model/message";
import { ERROR, INFO, SUCCESS, WARNING } from "../model/message-enum";

/**
 * This generates the message with given type=(ERROR, INFO, SUCCESS, WARNING)
 * @returns {IMessage} message
 */
const messageGenerator = () => ({
    errorMessage: (text: string): IMessage => {
        return {
            type: ERROR,
            text,
        };
    },
    infoMessage: (text: string): IMessage => {
        return {
            type: INFO,
            text,
        };
    },
    warningMessage: (text: string): IMessage => {
        return {
            type: WARNING,
            text,
        };
    },
    successMessage: (text: string): IMessage => {
        return {
            type: SUCCESS,
            text,
        };
    },
})

export default messageGenerator();