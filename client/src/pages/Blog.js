import React from "react";
import Accordion from "../components/common/Accordtion";

const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-4">
      <Accordion title="What are the different ways to manage a state in a React application?">
        <p>
          There are four main types of state you need to properly manage in your
          React apps:
        </p>
        <ul className="mt-2">
          <li>
            <strong>Local (UI) state</strong> – Local state is data we manage in
            one or another component.
          </li>
          <li>
            <strong>Global (UI) state –</strong> Global state is data we manage
            across multiple components.
          </li>
          <li>
            <strong>Server state –</strong> Data that comes from an external
            server that must be integrated with our UI state.
          </li>
          <li>
            <strong>URL state –</strong> Data that exists on our URLs, including
            the pathname and query parameters.
          </li>
        </ul>
      </Accordion>
      <Accordion title="How does prototypical inheritance work?">
        <p className="mt-2">
          JavaScript every object with its methods and properties contains an
          internal and hidden property known as [[Prototype]]. The Prototypal
          Inheritance is a feature in javascript used to add methods and
          properties in objects. It is a method by which an object can inherit
          the properties and methods of another object. Traditionally, in order
          to get and set the [[Prototype]] of an object, we use
          Object.getPrototypeOf and Object
        </p>
      </Accordion>

      <Accordion title="What is a unit test? Why should we write unit tests?">
        <p className="mt-2">
          The main objective of unit testing is to isolate written code to test
          and determine if it works as intended. Unit testing is an important
          step in the development process, because if done correctly, it can
          help detect early flaws in code which may be more difficult to find in
          later testing stages.
        </p>
      </Accordion>
      <Accordion title="what is the difference between React vs Angular vs Vue">
        <p className="mt-2">
          <strong>Angular.js</strong> is an MVC framework. A major disadvantage
          of Angular is that it uses a regular DOM, and thus, the entire tree
          structure of the HTML tags is updated, which massively impacts the
          loading time. Angular.js has its Ionic framework for mobile
          applications.
        </p>
        <p>
          <strong>React.js</strong> One of the biggest of them is that React.js
          uses a virtual DOM that only compares the previous HTML code
          differences and only loads the different parts. This significantly
          impacts the loading times. In a positive way, of course.
        </p>
        <p>
          <strong>Vue.js </strong>is built from the bottom up to be
          progressively adaptable, unlike other monolithic frameworks. The core
          library focuses solely on the view layer, and it’s simple to use and
          connect with other libraries or applications. This framework’s fast
          learning angle is almost a trademark. It’s a flexible framework that
          may be used as a library or a full-fledged framework for developing
          large web applications.
        </p>
      </Accordion>
    </div>
  );
};

export default Blog;
