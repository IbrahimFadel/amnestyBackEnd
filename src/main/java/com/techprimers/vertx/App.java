package com.techprimers.vertx;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.Route;

class App {
    public static void main(String[] args) {

        Vertx vertx = Vertx.vertx();

        HttpServer httpServer = vertx.createHttpServer();

        Router router = Router.router(vertx);

        Route indexRoute = router
                .get("/")
                .handler(routingContext -> {
                    HttpServerResponse response = routingContext.response();
                    response.setChunked(true);
                    response.sendFile("frontEnd/index.html");
                    System.out.println("Served: index.html");
                });
        httpServer
                .requestHandler(router::accept)
                .listen(8000);

        Route anyFromRoute = router
                .get("/:id")
                .handler(routingContext -> {
                    String fileName = routingContext.request().getParam("id");
                    HttpServerResponse response = routingContext.response();
                    response.sendFile("frontEnd/" + fileName);
                    System.out.println("Served: " + fileName);
                });

        Route articlesRoute = router
                .get("/publications/:id")
                .handler(routingContext -> {
                    String fileName = routingContext.request().getParam("id");
                    HttpServerResponse response = routingContext.response();
                    response.sendFile("frontEnd/publications/" + fileName);
                    System.out.println("Served: " + "publications/" + fileName);
                });

        Route cssRoute = router
                .get("/css/:id")
                .handler(routingContext -> {
                    String fileName = routingContext.request().getParam("id");
                    HttpServerResponse response = routingContext.response();
                    response.sendFile("frontEnd/css/" + fileName);
                    System.out.println("Served: css/" + fileName);
                });

        Route imgRoute = router
                .get("/img/:id")
                .handler(routingContext -> {
                    String fileName = routingContext.request().getParam("id");
                    HttpServerResponse response = routingContext.response();
                    response.sendFile("frontEnd/img/" + fileName);
                    System.out.println("Served: img/" + fileName);
                });

        Route fontsRoute = router
                .get("/fonts/:id")
                .handler(routingContext -> {
                    String fileName = routingContext.request().getParam("id");
                    HttpServerResponse response = routingContext.response();
                    response.sendFile("frontEnd/fonts/" + fileName);
                    System.out.println("Served: fonts/" + fileName);
                });

    }
}