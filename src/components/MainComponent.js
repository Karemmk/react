import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotion";
import { LEADERS } from "../shared/leaders";
import About from "./AboutComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DISHES: DISHES,
      comments: COMMENTS,
      promotion: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.DISHES.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotion.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = () => {
      const params = useParams();
      return (
        <Dishdetail
          dish={
            this.state.DISHES.filter(
              (dish) => dish.id === parseInt(params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(params.dishId, 10)
          )}
        />
      );
    };
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={HomePage()} />
          <Route
            exact
            path="/menu"
            element={<Menu dishes={this.state.DISHES} />}
          />
          <Route exact path="/menu/:dishId" element={<DishWithId />} />
          <Route exact path="/contactus" element={<Contact />} />
          <Route exact path="/aboutus" element={<About leaders={this.state.leaders}/>} />
          <Route path="*" element={<HomePage to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
