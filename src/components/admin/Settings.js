import React from 'react';

const Settings = () => {
  return (
    <div>
      <h3>Settings</h3>
      <form>
        <label>
          Admin Email: <input type="email" placeholder="admin@synergy.com" />
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
