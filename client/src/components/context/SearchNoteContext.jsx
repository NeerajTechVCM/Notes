import React, { createContext, useContext, useState } from 'react'

 const SearchNoteContext=createContext();

export default function SearchProvider({children}) {
    
    const [searchResults,setSearchResults]=useState([]);
  return (
   <SearchNoteContext.Provider value={[searchResults,setSearchResults]}>
    {children}
   </SearchNoteContext.Provider>
  )
}

export const useSearch=()=>useContext(SearchNoteContext);