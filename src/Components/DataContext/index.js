import React, { createContext, useState } from 'react';
// Create a context
const DataContext = createContext();
// Create a provider component
export const DataProvider = ({ children }) => {
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
  return (
    <DataContext.Provider value={{ project, setProject, projects, setProjects, selectedFile, setSelectedFile }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;