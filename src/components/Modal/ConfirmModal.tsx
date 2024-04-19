import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function ConfirmModal({
  title,
  notification,
  action,
  show,
  handleCloseModal,
  handleClickDelete
}: {
  title: string
  notification: string
  action: string
  show: boolean
  handleCloseModal: () => void
  handleClickDelete: () => void
}) {
  return (
    <>
      <Modal show={show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notification}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='danger' onClick={handleClickDelete}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ConfirmModal
