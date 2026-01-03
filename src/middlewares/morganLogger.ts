import morgan from "morgan";
import logger from "../utils/logger";


const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export const morganLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);
