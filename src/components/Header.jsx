const Header = ({ title, image }) => {
  return (
    <div className="bg-blue-100 p-6 text-center rounded-md shadow-sm">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {image ? (
        <img
          src={image}
          alt="Uploaded Header"
          className="mx-auto max-h-48 border border-dashed border-gray-400 p-2"
        />
      ) : (
        <p className="text-sm text-gray-500">No image uploaded yet.</p>
      )}
    </div>
  );
};

export default Header;
