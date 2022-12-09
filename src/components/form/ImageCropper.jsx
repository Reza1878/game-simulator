import getCroppedImg, { readFile } from "@/utils/cropper";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Cropper from "react-easy-crop";
import { FormControl, Label } from ".";

const ImageCropper = forwardRef(
  ({ label = "", aspect, ...otherProps }, ref) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
      if (!image) {
        setImageUrl(null);
        return;
      }
      (async () => {
        const imageDataUrl = await readFile(image);
        setImageUrl(imageDataUrl);
      })();
    }, [image]);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    useImperativeHandle(ref, () => ({
      getCroppedImage: async () => {
        try {
          if (!imageUrl) return null;
          const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
          return croppedImage;
        } catch (e) {
          console.error(e);
        }
      },
    }));
    return (
      <>
        <FormControl
          type="file"
          label={label}
          InputProps={{
            accept: "image/*",
            onChange: (e) => {
              const image = e.target.files;
              setImage(image[0] || null);
            },
          }}
        />
        {image !== null && (
          <div className="flex gap-4 flex-wrap">
            <div className="relative w-full max-w-2xl h-64 mb-3">
              <Cropper
                image={imageUrl}
                aspect={aspect}
                crop={crop}
                onCropComplete={onCropComplete}
                onCropChange={setCrop}
                zoom={zoom}
                onZoomChange={setZoom}
                {...otherProps}
              />
            </div>
            <div>
              <Label>Zoom</Label>
              <input
                type="range"
                min={1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                max={100}
              />
            </div>
          </div>
        )}
      </>
    );
  }
);

export default ImageCropper;
