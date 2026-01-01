export function preloadImages(imageUrls, onProgress) {
  let loaded = 0;
  const total = imageUrls.length;

  return new Promise((resolve) => {
    if (total === 0) resolve();

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = img.onerror = () => {
        loaded++;
        onProgress?.(Math.round((loaded / total) * 100));

        if (loaded === total) {
          resolve();
        }
      };
    });
  });
}
