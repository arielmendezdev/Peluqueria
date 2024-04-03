const { asClass, createContainer, asFunction, asValue } = require("awilix");
const Server = require("./server");
const StartUp = require("./startUp");
const db = require("./models");
const config = require("./database/config");
const {
  AcompController,
  AddressController,
  ClientController,
  CompanyController,
  EmployeeController,
  LocalController,
  ServiceController,
  TurnController,
} = require("./controllers");
const router = require("./routes");
const CompanyRoutes = require("./routes/company.routes");
const LocalRoutes = require("./routes/local.routes")
const EmployeeRoutes = require("./routes/employee.routes")
const ClientRoutes = require("./routes/client.routes")
const AcompRoutes = require("./routes/acomp.routes")
const AddressRoutes = require("./routes/address.routes")
const TurnRoutes = require("./routes/turn.routes")
const ServiceRoutes = require("./routes/service.routes")

const container = createContainer();

container
  .register({
    app: asClass(StartUp).singleton(),
    server: asClass(Server).singleton(),
    db: asValue(db),
    config: asValue(config),
  })
  .register({
    CompanyController: asClass(CompanyController).singleton(),
    LocalController: asClass(LocalController).singleton(),
    EmployeeController: asClass(EmployeeController).singleton(),
    ClientController: asClass(ClientController).singleton(),
    AcompController: asClass(AcompController).singleton(),
    AddressController: asClass(AddressController).singleton(),
    TurnController: asClass(TurnController).singleton(),
    ServiceController: asClass(ServiceController).singleton(),
})
  .register({
    router: asFunction(router).singleton(),
    CompanyRoutes: asFunction(CompanyRoutes).singleton(),
    LocalRoutes: asFunction(LocalRoutes).singleton(),
    EmployeeRoutes: asFunction(EmployeeRoutes).singleton(),
    ClientRoutes: asFunction(ClientRoutes).singleton(),
    AcompRoutes: asFunction(AcompRoutes).singleton(),
    AddressRoutes: asFunction(AddressRoutes).singleton(),
    TurnRoutes: asFunction(TurnRoutes).singleton(),
    ServiceRoutes: asFunction(ServiceRoutes).singleton(),
});

module.exports = container;
