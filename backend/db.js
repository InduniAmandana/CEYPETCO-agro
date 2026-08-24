// backend/db.js
// ─────────────────────────────────────────────────────────────
// MSSQL connection pool
// Uses environment variables from .env
// ─────────────────────────────────────────────────────────────

const sql = require("mssql");

const config = {
  server:   process.env.MSSQL_HOST     || "192.168.100.71",
  port:     parseInt(process.env.MSSQL_PORT || "1433", 10),
  database: process.env.MSSQL_DATABASE || "agro",
  user:     process.env.MSSQL_USER     || "sa",
  password: process.env.MSSQL_PASSWORD || "",
  options: {
    encrypt:              process.env.MSSQL_ENCRYPT === "true",
    trustServerCertificate: process.env.MSSQL_TRUST_SERVER_CERT === "true",
    enableArithAbort:     true,
  },
  connectionTimeout: parseInt(process.env.MSSQL_CONNECTION_TIMEOUT || "15000", 10),
  requestTimeout:    parseInt(process.env.MSSQL_REQUEST_TIMEOUT    || "30000", 10),
  pool: {
    max:               10,
    min:               0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

/**
 * Returns the shared connection pool.
 * Creates it on first call, reuses on subsequent calls.
 */
async function getPool() {
  if (pool) return pool;

  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log(`✅ MSSQL connected → ${config.server}/${config.database}`);
    return pool;
  } catch (err) {
    console.error("❌ MSSQL connection failed:", err.message);
    throw err;
  }
}

/**
 * Convenience: run a parameterised query.
 * Usage:
 *   const rows = await query(
 *     "SELECT * FROM products WHERE id = @id",
 *     { id: { type: sql.Int, value: 5 } }
 *   );
 */
async function query(queryString, params = {}) {
  const pool = await getPool();
  const request = pool.request();

  for (const [key, { type, value }] of Object.entries(params)) {
    request.input(key, type, value);
  }

  const result = await request.query(queryString);
  return result.recordset;
}

module.exports = { getPool, query, sql };