import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import "./PatientForm.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Dropzone } from "../Dropzone/Dropzone";

const schema = z.object({
  full_name: z.string().regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  email: z.string().email().endsWith("@gmail.com", "Must be a Gmail address"),
  phone_country_code: z.string().regex(/^\+\d+$/, "Invalid code"),
  phone_number: z.string().min(6, "Invalid number"),
  document_photo: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

export const PatientForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [modal, setModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone_country_code", data.phone_country_code);
    formData.append("phone_number", data.phone_number);
    if (file) {
      formData.append("document_photo", file);
    }

    try {
      await api.post("/patients", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setModal({
        open: true,
        type: "success",
        message: "Patient registered successfully!",
      });

      reset();
      onSuccess();
    } catch (error: unknown) {
      let errorMessage = "Something went wrong. Try again.";

      // Type assertion for error object
      const err = error as {
        response?: {
          status?: number;
          data?: { errors?: Record<string, string[]> };
        };
        code?: string;
      };

      // Handle validation errors
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errors = err.response.data.errors;

        if (errors.email?.includes("already been taken")) {
          errorMessage =
            "This email is already registered. Please use a different email.";
        } else if (errors.email?.includes("must end with @gmail.com")) {
          errorMessage =
            "Email must be a Gmail address (ending with @gmail.com).";
        } else if (errors.email?.includes("must be a valid email")) {
          errorMessage = "Please enter a valid email address.";
        } else if (errors.document_photo) {
          errorMessage =
            "Please upload a valid document photo (JPG format required).";
        } else if (errors.full_name?.includes("required")) {
          errorMessage = "Full name is required.";
        } else if (errors.full_name?.includes("regex")) {
          errorMessage = "Full name can only contain letters and spaces.";
        } else if (errors.phone_country_code) {
          errorMessage = "Please enter a valid country code (e.g., +54).";
        } else if (errors.phone_number) {
          errorMessage = "Please enter a valid phone number.";
        } else {
          const firstError = Object.values(errors)[0] as string[] | undefined;
          if (firstError?.[0]) {
            errorMessage = firstError[0];
          }
        }
      } else if (err.response?.status === 413) {
        errorMessage = "File too large. Please upload a smaller image.";
      } else if (err.response?.status && err.response.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      }

      setModal({
        open: true,
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <>
      <form className="patient-form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Full Name" {...register("full_name")} />
        {errors.full_name && (
          <p className="error">{errors.full_name.message}</p>
        )}

        <input placeholder="Email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <div className="patient-form__group">
          <input placeholder="+54" {...register("phone_country_code")} />
          <input placeholder="1123456789" {...register("phone_number")} />
        </div>

        {errors.phone_country_code && (
          <p className="error">{errors.phone_country_code.message}</p>
        )}
        {errors.phone_number && (
          <p className="error">{errors.phone_number.message}</p>
        )}

        <Dropzone
          onFileSelect={(file) => {
            setFile(file);
          }}
        />
        {!file && errors.document_photo && (
          <p className="error">{errors.document_photo.message as string}</p>
        )}

        <button className="button" type="submit">
          Add Patient
        </button>
      </form>

      <Modal
        isOpen={modal.open}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </>
  );
};
