import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: SidebarLink[]; // Optional children for nested links
}

interface SearchInputProps {
  links: SidebarLink[];
}

const SearchInput: React.FC<SearchInputProps> = ({ links }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLinks, setFilteredLinks] = useState<SidebarLink[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    return storedSearches ? JSON.parse(storedSearches) : [];
  });
  const [favorites, setFavorites] = useState<SidebarLink[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const results = links.filter(link =>
        link.label.toLowerCase().includes(lowerCaseTerm),
      );
      setFilteredLinks(results);
      setNoResults(results.length === 0);
    } else {
      setFilteredLinks([]);
      setNoResults(false);
    }
  }, [searchTerm, links]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      const updatedSearches = [...recentSearches, searchTerm];
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    setSearchTerm('');
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setSearchTerm('');
  };

  const toggleFavorite = (link: SidebarLink) => {
    const updatedFavorites = favorites.includes(link)
      ? favorites.filter(fav => fav.href !== link.href)
      : [...favorites, link];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="relative">
      {/* Input to trigger the modal */}
      <div className="w-28 flex items-center justify-center">
        <i className="pi pi-search absolute left-2"></i>
        <input
          type="text"
          value={searchTerm}
          onClick={toggleModal}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border pl-8 rounded px-2 py-1 w-full cursor-pointer"
          readOnly
        />
        <div className="flex items-center justify-center rounded h-6 w-6 text-xs right-1 absolute bg-cyan-100">#</div>
      </div>

      {/* Tailwind CSS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-lg font-bold">Search</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-800">
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSearchSubmit} className="p-4">
              <div className="relative mb-4">
                <i className="pi pi-search absolute left-2 top-2"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="border rounded pl-8 py-2 w-full"
                />
              </div>
            </form>

            <div className="px-4 pb-4 max-h-60 overflow-y-auto">
              {filteredLinks.length > 0 ? (
                <div className="suggestions">
                  {filteredLinks.map(link => (
                    <div
                      key={link.label}
                      className="flex items-center justify-between p-2 hover:bg-gray-100"
                    >
                      <Link
                        href={link.href}
                        onClick={toggleModal}
                        className="flex items-center w-full"
                      >
                        {link.icon} - {link.href}
                        <span className="ml-2">{highlightText(link.label, searchTerm)}</span>
                      </Link>
                      <button
                        onClick={() => toggleFavorite(link)}
                        className={`p-2 text-sm ${
                          favorites.includes(link) ? 'text-red-600' : 'text-green-600'
                        }`}
                        title={
                          favorites.includes(link)
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                      >
                        {favorites.includes(link) ? '★' : '☆'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                noResults && (
                  <div className="text-red-600 text-center mt-2">
                    <p>No results found for "<strong>{searchTerm}</strong>".</p>
                  </div>
                )
              )}

              {recentSearches.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Recent Searches:</h4>
                  <ul>
                    {recentSearches.map(search => (
                      <li
                        key={search}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSearchTerm(search)}
                      >
                        {highlightText(search, searchTerm)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
