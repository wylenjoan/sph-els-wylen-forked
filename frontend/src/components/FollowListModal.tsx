import { Modal, Button } from "react-bootstrap";

interface Props {
  title: string,
  children: JSX.Element,
  show: boolean,
  handleClose: () => void,

}

function FollowListModal(props: Props) {
  const {
    title,
    show,
    children,
    handleClose,
  } = props;

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FollowListModal;
