const YourComponent = () => {
  return (
    <div>
      <h1 data-translate>Welcome to our website</h1>
      <p data-translate>This text will be translated</p>
      {/* Elements without data-translate won't be translated */}
      <span>This text will not be translated</span>
    </div>
  );
}; 

export default YourComponent;