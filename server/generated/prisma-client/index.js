"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Team",
    embedded: false
  },
  {
    name: "Player",
    embedded: false
  },
  {
    name: "Result",
    embedded: false
  },
  {
    name: "Area",
    embedded: false
  },
  {
    name: "Match",
    embedded: false
  },
  {
    name: "Apply",
    embedded: false
  },
  {
    name: "Notifier",
    embedded: false
  },
  {
    name: "Stadium",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: process.env.PRISMA_HOST,
  secret: process.env.PRISMA_SECRET_KEY
});
exports.prisma = new exports.Prisma();
