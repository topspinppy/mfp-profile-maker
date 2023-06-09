import { useRef, useState } from "react";
import CropImageModal from "./CropImageModal";

interface IImageUploader {
  onUpload(image: string | ArrayBuffer | null): void;
}

export default function ImageUploader({ onUpload }: IImageUploader) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [imageString, setImageString] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOpenModal(true);
        setImageString(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    if (!inputFileRef.current) return;
    inputFileRef?.current.click();
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        ref={inputFileRef}
      />
      <button
        onClick={handleClickUpload}
        className="bg-anakotmai-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded font-anakotmai-light"
      >
        เลือกรูปภาพของคุณ
      </button>

      <CropImageModal
        isModalOpen={openModal}
        onOk={(image) => {
          onUpload(image);
          setOpenModal(false);
        }}
        onCancel={() => setOpenModal(false)}
        image={imageString}
      />
    </div>
  );
}
