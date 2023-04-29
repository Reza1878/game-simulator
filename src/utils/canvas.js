import html2canvas from "html2canvas";

const downloadImage = (blob, fileName) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = blob;
  document.body.appendChild(link);

  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  document.body.removeChild(link);
};

export const exportAsImage = async (el, imageFileName) => {
  const canvas = await html2canvas(el, { allowTaint: true, useCORS: true });
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
};
