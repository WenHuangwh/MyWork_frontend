import React from "react";
import "./navigation.css";
import { useLocation, Link } from "react-router-dom";

function Navigation() {
  const { pathname } = useLocation();
  // console.log(location.pathname);
  const links = [
    { label: 'Rank', icon: 'fa-square-t', path: '/rank' },
    { label: 'Leetcode', icon: 'fa-home', path: '/leetcodes' },
    { label: 'My Leetcode', icon: 'fa-hashtag', path: '/explore' },
    { label: 'OA', icon: 'fa-bell', path: '/notifications' },
    { label: 'My OA', icon: 'fa-envelope', path: '/messages' },
    { label: 'BQ', icon: 'fa-bookmark', path: '/bookmarks' },
    { label: 'My BQ', icon: 'fa-list', path: '/lists' },
    { label: 'Concept', icon: 'fa-user', path: '/profile' },
    { label: 'Job List', icon: 'fa-user', path: '/jobs' },
    { label: 'My Job', icon: 'fa-list-check', path: '/users/:uid/jobs'},
    { label: 'Login', icon: 'fa-user', path: '/login' },
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