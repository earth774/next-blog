import AdSense from "./AdSense";

const Footer = () => {
  return (
    <footer className="mt-auto mb-4 text-center text-sm text-black">
      {/* AdSense Ad Unit */}
      <div className="mb-6">
        <AdSense
          adSlot="9048881048"
          adFormat="auto"
          fullWidthResponsive={true}
        />
      </div>

      <a
        href="https://x.com/SutthiponGEarth"
        target="_blank"
        rel="noopener noreferrer"
      >
        <em>@ amiearth</em>
      </a>
    </footer>
  );
};

export default Footer;
