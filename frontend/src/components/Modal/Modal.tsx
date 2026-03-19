import "./Modal.css";

type Props = {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export const Modal = ({ isOpen, type, message, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{type === "success" ? "Success 🎉" : "Error ❌"}</h2>
        <p>{message}</p>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
