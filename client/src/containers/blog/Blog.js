import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LinkButton from '../../components/LinkButton';
import BlogPost from '../blog-post/BlogPost';

const Blog = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:slug`}>
          <BlogPost />
        </Route>
        <Route path={match.path}>
          <>
            blog <hr />
            <LinkButton to="/" type="primary">
              Home
            </LinkButton>
          </>
        </Route>
      </Switch>
    </>
  );
};

export default Blog;
