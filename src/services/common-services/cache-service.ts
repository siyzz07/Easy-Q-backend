// import { redisConfig } from "../../config/redisConfig";
// import logger from "../../utils/logger";
// import { ICacheService } from "../../interface/cache-interface/cache-service-interface";
// import { createClient, RedisClientType } from "redis";

// export class CacheService implements ICacheService {
//   private client: RedisClientType;

//   constructor() {
//     this.client = createClient({
//       username: redisConfig.userName,     // must be "default"
//       password: redisConfig.password,     // Redis Cloud password
//       socket: {
//         host: redisConfig.host,
//         port: Number(redisConfig.port),
       
//       },
//     });

   

//     this.client.on("connect", () => {
//       logger.info("Redis connected..");
//     });

//     this.client.on("error", (err) => {
//       console.log("Redis Error:", err);
//       logger.error("Redis Connection Error:", err);
//     });

//     this.client.connect();                // ⭐ REQUIRED
//   }

//   async set(key: string, value: any, ttlSeconds: number): Promise<void> {
//     try {
//       await this.client.set(key, JSON.stringify(value), { EX: ttlSeconds });
//     } catch (error: any) {
//       logger.error("Redis SET Error:", error.message);
//     }
//   }

//   async get<T>(key: string): Promise<T | null> {
//     const data = await this.client.get(key);
//     return data ? JSON.parse(data) : null;
//   }

//   async del(key: string): Promise<boolean> {
//     try {
//       const result = await this.client.del(key);
//       return result === 1;
//     } catch (error: any) {
//       logger.error("Redis DELETE Error:", error.message);
//       return false;
//     }
//   }

//   async exists(key: string): Promise<boolean> {
//     try {
//       const result = await this.client.exists(key);
//       return result === 1;
//     } catch (error: any) {
//       logger.error("Redis EXISTS Error:", error.message);
//       return false;
//     }
//   }
// }
