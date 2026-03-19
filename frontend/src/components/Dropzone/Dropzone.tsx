import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

type Props = {
  onFileSelect: (file: File) => void;
};

export const Dropzone = ({ onFileSelect }: Props) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"] },
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />

      <p>Drag & drop a .jpg image here, or click to select</p>

      {acceptedFiles.length > 0 && (
        <img
          src={URL.createObjectURL(acceptedFiles[0])}
          alt="preview"
          style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
        />
      )}
    </div>
  );
};
