import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface MessageBoxProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    content: string;
    buttonLabel: string;
    buttonOnClick?: () => void;
}

function MessageBox({ open, onClose, title, content, buttonLabel, buttonOnClick }: MessageBoxProps) {
    return (
      <Dialog
        className="cp-message-box-container"
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
            className="cp-message-box-title"
            id="alert-dialog-title"
        >
          { title || '' }
        </DialogTitle>
        <DialogContent className="cp-message-box-content">
          <DialogContentText id="alert-dialog-description">
            { content }
          </DialogContentText>
        </DialogContent>
        <DialogActions className="cp-message-box-actions">
            <Button
                className="cp-message-box-actions-button"
                onClick={() => {
                    onClose()
                    if(buttonOnClick) buttonOnClick()
                }}
            >
                { buttonLabel }
            </Button>
        </DialogActions>
      </Dialog>
    );
}

export default MessageBox;