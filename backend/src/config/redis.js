import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", err => console.error("Redis Error", err));

await redis.connect();

export default redis;
//$2b$10$2LRS0wO8IFAFo/Bm8i4xuuUr1DWw0na3.KVHxsJ23uFEQfxWKpvBq
//$2b$10$f8kq.aIF4xNUusPnFwubFeqblZPenq9SsyACsZl5IvX9EexesawBa