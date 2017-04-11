import { Router } from "express";

import * as authendicator from '../middleware/auth';
import * as routesMappers from './routing';

export default function mapRoutes(app){
  Object.keys(routesMappers).forEach( (key) => {
      let router = new Router();
      let routeMapper = routesMappers[key];
      routeMapper.routes.forEach( (route) => {
          let middlewares = [];
          if(route.auth == "open"){
              delete route.auth;
          }else{
              middlewares.push(authendicator.authenticate);
          }

          if(route.section && route.section.length > 0){
              middlewares.push(authendicator.checkRole(route.section));
          }
          //combine already existing middleware to auth middle wares
          middlewares = middlewares.concat(route.middlewares || []);
          
          router[route.method](route.url, middlewares, route.action);
      });

      if(routeMapper.middlewares && routeMapper.middlewares.length > 0){
          router.use(routeMapper.middlewares);
      }
      if(!routeMapper.basePath.startsWith('/'))
          routeMapper.basePath = "/" + routeMapper.basePath; 
      app.use(routeMapper.basePath, router);
  });
};
