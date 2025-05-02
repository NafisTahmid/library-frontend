import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
  // Extract keyword from URL search string
  const getKeyword = () => {
    if (!keyword) return '';
    try {
      const params = new URLSearchParams(keyword);
      return params.get('keyword') || '';
    } catch (error) {
      return '';
    }
  };

  // Generate proper URL object for LinkContainer
  const getPageUrl = (pageNumber) => {
    const params = new URLSearchParams();
    const cleanKeyword = getKeyword();
    
    if (cleanKeyword) params.set('keyword', cleanKeyword);
    params.set('page', pageNumber);

    if (isAdmin) {
      return {
        pathname: '/admin/productsList/',
        search: params.toString()
      };
    }
    
    return {
      pathname: '/',
      search: params.toString()
    };
  };

  return (
    pages > 1 && (
      <Pagination className="justify-content-center my-3">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer 
            key={x + 1} 
            to={getPageUrl(x + 1)}
          >
            <Pagination.Item disabled={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;