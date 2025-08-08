const Header = ({ title, image }) => {
  return (
    <div className="header">
      <h1 className="header-title">{title}</h1>
      {image ? (
        <img src={image} alt="Uploaded Header" className="header-image" />
      ) : (
        <p className="header-placeholder">No image uploaded yet.</p>
      )}
    </div>
  );
};

export default Header;
