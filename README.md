This application is following the coding exercises provided by [Single Page Web Applications](http://www.manning.com/mikowski/)

Instead of using a MongoDB, Express, JQuery, and Node.js, I'd
like to use Java for the backend. I'd also like to implement
Continuous Delivery to GAE/J while treating each chapter as a
release. Another goal is to make the project portable to other
cloud platforms.

To build, run

    mvn package

Building will run the tests, but to explicitly run tests you can use the test target

    mvn test

To start the app, use the [App Engine Maven Plugin](http://code.google.com/p/appengine-maven-plugin/) that is already included in this demo.  Just run the command.

    mvn appengine:devserver -Denv=local

For further information, consult the [Java App Engine](https://developers.google.com/appengine/docs/java/overview) documentation.

To see all the available goals for the App Engine plugin, run

    mvn help:describe -Dplugin=appengine

    mvn jetty:run-exploded
