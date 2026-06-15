import { useEffect, useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&h=200&fit=crop",
];

function Imagee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let animFrame;
    let offset = 0;

    const step = () => {
      offset += 0.5; 
      const half = track.scrollWidth / 2;
      if (offset >= half) offset = 0;
      track.style.transform = `translateX(-${offset}px)`;
      animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const allImages = [...images, ...images]; 

  return (
    <div style={styles.strip}>
      <div ref={trackRef} style={styles.track}>
        {allImages.map((src, i) => (
          <img key={i} src={src} alt="item" style={styles.img} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  strip: {
    overflow: "hidden",
    width: "100%",
  },
  track: {
    display: "flex",
    width: "max-content",
  },
  img: {
    width: "160px",
    height: "130px",
    objectFit: "cover",
    flexShrink: 0,
    marginRight: "8px",
    borderRadius:"12px"
  },
};

export default Imagee;
