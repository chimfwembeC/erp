import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex my-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <>
                <Link href={item.href} className="text-gray-700 hover:text-blue-600">
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-gray-400 mx-2">&gt;</span> // Use > as separator
                )}
              </>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Define the prop types for the Breadcrumb component
Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
