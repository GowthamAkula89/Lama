import React, { createContext, useState } from 'react';
// Create a context
const DataContext = createContext();
// Create a provider component
export const DataProvider = ({ children }) => {
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
  return (
    <DataContext.Provider value={{ project, setProject, projects, setProjects }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;