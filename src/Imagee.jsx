import { useEffect, useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1756705533779-105bf34e0722?w=800&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1669671943625-e20799ee5f42?w=800&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1700219212623-77aebb917034?w=800&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1729671286475-23506bef1584?w=800&q=80&fit=crop&auto=format",
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
    width: "210px",
    height: "190px",
    objectFit: "cover",
    flexShrink: 0,
    marginRight: "8px",
    borderRadius:"12px"
  },
};

export default Imagee;
