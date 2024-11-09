import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Link } from '@inertiajs/react';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: SidebarLink[]; // Add optional children for nested links
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
        <span key={index} className="bg-primary text-white">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const footer = (
    <div className="flex justify-end">
      <button
        onClick={toggleModal}
        className="p-button p-component bg-primary text-white p-2"
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <i className="pi pi-search absolute left-2"></i>
        <input
          type="text"
          value={searchTerm}
          onClick={toggleModal}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border pl-8 rounded px-2 py-1 w-full"
          readOnly
        />
      </div>

      <Dialog
        visible={isModalOpen}
        onHide={toggleModal}
        header="Search"
        footer={footer}
        style={{ width: 500, height: 800, margin: 0 }}
        closable={false}
      >
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex items-center justify-center">
            <i className="pi pi-search absolute left-2"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="border rounded pl-8 mb-2 w-full"
            />
          </div>
        </form>

        <div className="max-h-64 overflow-y-auto">
          {filteredLinks.length > 0 && (
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
                    {link.icon}
                    <span className="ml-2">{highlightText(link.label, searchTerm)}</span>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(link)}
                    className={`p-button ${favorites.includes(link) ? 'p-button-danger' : 'p-button-success'}`}
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
          )}

          {noResults && (
            <div className="text-red-600 text-center mt-2">
              <p>
                No results found for "<strong>{searchTerm}</strong>". Please try a
                different search term.
              </p>
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold">Recent Searches:</h4>
              <ul>
                {recentSearches
                  .filter(search => !favorites.some(fav => fav.label === search))
                  .map(search => (
                    <li key={search} className="p-2 hover:bg-gray-100">
                      {highlightText(search, searchTerm)}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default SearchInput;
