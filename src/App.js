import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import ProfileDetailsScreen from './components/ProfileDetailsScreen/ProfileDetailsScreen';
import PostDetailsScreen from './components/PostDetailsScreen/PostDetailsScreen';
import GalleryScreen from './components/GalleryScreen/GalleryScreen';
import ToDoScreen from './components/ToDoScreen/ToDoScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile/:id" component={ProfileDetailsScreen} />
        <Route path="/profile/:id/post" component={PostDetailsScreen} />
        <Route path="/gallery/:id" component={GalleryScreen} />
        <Route path="/todo/:id" component={ToDoScreen} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
export default App;
// export  {ProfileDetailsScreen, PostDetailsScreen, GalleryScreen, ToDoScreen };
