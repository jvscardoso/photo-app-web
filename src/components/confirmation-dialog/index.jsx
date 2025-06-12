import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Render from '../../components/conditional/Render'

export default function ConfirmDialog({title, content, action, open, onClose, cancelText, showCancelButton, ...other}) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{pb: 2}}>{title}</DialogTitle>

      {content && <DialogContent sx={{typography: 'body2'}}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Render if={showCancelButton}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {cancelText}
          </Button>
        </Render>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.defaultProps = {
  cancelText: 'Cancelar',
  showCancelButton: true
}

ConfirmDialog.propTypes = {
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  title: PropTypes.string,
  cancelText: PropTypes.string
}
