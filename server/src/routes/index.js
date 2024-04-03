const { Router } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = ({
  CompanyRoutes,
  LocalRoutes,
  EmployeeRoutes,
  ClientRoutes,
  AcompRoutes,
  AddressRoutes,
  TurnRoutes,
  ServiceRoutes,
}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter.use(cors()).use(bodyParser.json());

  apiRouter.use("/company", CompanyRoutes);
  apiRouter.use("/local", LocalRoutes);
  apiRouter.use("/employee", EmployeeRoutes);
  apiRouter.use("/client", ClientRoutes);
  apiRouter.use("/acomp", AcompRoutes);
  apiRouter.use("/address", AddressRoutes);
  apiRouter.use("/turn", TurnRoutes);
  apiRouter.use("/service", ServiceRoutes);

  router.use("/api", apiRouter);

  return router;
};
