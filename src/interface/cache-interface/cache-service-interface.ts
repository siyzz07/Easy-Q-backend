import Redis from "ioredis";
import { redisConfig } from "../../config/redisConfig";
import logger from "../../utils/logger";

class CacheService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      username: redisConfig.userName,
      password: redisConfig.password,
      tls: {}, 
    });

   
    this.client.on("error", (err) => {
        logger.error("Redis Connection Error:", err.message)
    });
  }


 
}

export const cacheService = new CacheService();
