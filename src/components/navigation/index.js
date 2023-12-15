import React from "react";
import "./navigation.css";
import { useLocation, Link } from "react-router-dom";

function Navigation({ uid }) {
  const { pathname } = useLocation();
  // console.log(location.pathname);
  const links = [
    { label: 'Job', icon: 'fa-sharp fa-solid fa-phone', path: '/jobs' },

    { label: 'Leetcode', icon: 'fa-sharp fa-solid fa-chalkboard', path: `/leetcodes` },
    { label: 'My Leetcode', icon: 'fa-sharp fa-solid fa-bell', path: '/myleetcodes' },
    { label: 'OA', icon: 'fa-book-copy', path: '/oas' },
    { label: 'My OA', icon: 'fa-book', path: '/myoa' },
    { label: 'BQ', icon: 'fa-bookmark', path: '/bqs' },
    { label: 'My BQ', icon: 'fa-atom-simple', path: '/mybq' },

    // { label: 'Concept', icon: 'fa-atom-simple', path: '/profile' },
  ];
  return (
    <div className="ttr-navigation">
      <div className="list-group">
        {
          links.map((link, ndx) => {
            return (
              <Link
                to={link.path} id={link.label}
                key={ndx}
                className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
                          ${pathname.indexOf(link.path) >= 0 ? 'active' : ''}`}>
                <i className={`fa ${link.icon} text-center`}></i>
                <span className="ttr-label">{link.label}</span>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};

export default Navigation;