require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { query, sql, getPool } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Helpers
function ok(res, data, extra = {}) {
  return res.json({ success: true, ...extra, data });
}

function fail(res, status, message) {
  return res.status(status).json({ success: false, message });
}

function buildAiReply(message) {
  const text = String(message || "").toLowerCase();

  if (text.includes("orange") || text.includes("brown spots") || text.includes("yellow borders")) {
    return {
      diagnosis: "Possible Bacterial Leaf Blight (BLB)",
      advice: [
        "Apply Copper Oxychloride 50% WP at 3g/L water.",
        "Reduce irrigation for 5 to 7 days if there is waterlogging.",
        "Improve drainage and remove severely affected leaves where practical.",
      ],
      recommendedProduct: "Agro Shield Plus",
      disclaimer: "AI guidance only. Confirm with a qualified agronomist before field application.",
    };
  }

  if (text.includes("yellow leaf") || text.includes("deficiency")) {
    return {
      diagnosis: "Possible nutrient deficiency pattern",
      advice: [
        "Check whether yellowing starts on older or younger leaves.",
        "Review recent fertilizer schedule and irrigation consistency.",
        "Use a balanced micronutrient correction if symptoms are widespread.",
      ],
      recommendedProduct: "Yield Boost Mix",
      disclaimer: "AI guidance only. Confirm with a qualified agronomist before field application.",
    };
  }

  return {
    diagnosis: "General crop stress",
    advice: [
      "Share crop type, crop stage, and when symptoms started.",
      "Describe leaf, stem, root, or fruit symptoms more precisely.",
      "Include recent rain, irrigation, and spray history for better guidance.",
    ],
    recommendedProduct: null,
    disclaimer: "AI guidance only. Confirm with a qualified agronomist before field application.",
  };
}

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await getPool();
    res.json({
      success: true,
      message: "API and MSSQL are healthy.",
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "API running but DB unreachable.",
    });
  }
});

// Products page
app.get("/api/products-page", async (req, res) => {
  try {
    const categories = await query(`
      SELECT c.id, c.title, c.slug, c.description, c.emoji, c.accent, c.light_accent, c.product_count
      FROM product_categories c
      ORDER BY c.id
    `);

    for (const cat of categories) {
      cat.tags = (
        await query(
          "SELECT tag FROM category_tags WHERE category_id = @id",
          { id: { type: sql.Int, value: cat.id } }
        )
      ).map(r => r.tag);
    }

    const featured = await query(`
      SELECT p.id, p.name, p.slug, c.title AS category, c.slug AS categorySlug,
             p.description AS desc, p.emoji, p.accent, p.badge,
             p.active_ingredient AS activeIngredient, p.dosage, p.rating, p.review_count AS reviews
      FROM products p
      JOIN product_categories c ON p.category_id = c.id
      WHERE p.is_featured = 1 AND p.is_active = 1
      ORDER BY p.id
    `);

    for (const prod of featured) {
      prod.crops = (
        await query(
          "SELECT crop_name FROM product_crops WHERE product_id = @id",
          { id: { type: sql.Int, value: prod.id } }
        )
      ).map(r => r.crop_name);
    }

    const pillars = [
      {
        title: "Protection",
        desc: "Grouped by threat type, crop, and treatment logic — not alphabetical chaos.",
        accent: "#f4845f",
        lightAccent: "#f4845f15",
      },
      {
        title: "Nutrition",
        desc: "Presented as programs, not isolated SKUs. Season-long plans your agronomist can follow.",
        accent: "#5bb8f5",
        lightAccent: "#5bb8f515",
      },
      {
        title: "Bio Care",
        desc: "Sustainable alternatives with their own clear commercial pathway and use-case framing.",
        accent: "#7ec94a",
        lightAccent: "#7ec94a15",
      },
    ];

    ok(res, { categories, featured, pillars, totalProductsLabel: "213 products" });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to load products page data.");
  }
});

// Categories
app.get("/api/products/categories", async (req, res) => {
  try {
    const categories = await query(`
      SELECT id, title, slug, description, emoji, accent, light_accent, product_count
      FROM product_categories
      ORDER BY id
    `);

    for (const cat of categories) {
      cat.tags = (
        await query(
          "SELECT tag FROM category_tags WHERE category_id = @id",
          { id: { type: sql.Int, value: cat.id } }
        )
      ).map(r => r.tag);
    }

    ok(res, categories, { count: categories.length });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to fetch categories.");
  }
});

// Category detail
app.get("/api/products/categories/:slug", async (req, res) => {
  try {
    const rows = await query(
      "SELECT * FROM product_categories WHERE slug = @slug",
      { slug: { type: sql.NVarChar, value: req.params.slug } }
    );

    if (!rows.length) return fail(res, 404, "Category not found.");

    const cat = rows[0];

    const [tags, highlights, useCases, productTypes, relatedProducts] = await Promise.all([
      query(
        "SELECT tag FROM category_tags WHERE category_id = @id ORDER BY id",
        { id: { type: sql.Int, value: cat.id } }
      ),
      query(
        "SELECT highlight FROM category_highlights WHERE category_id = @id ORDER BY sort_order",
        { id: { type: sql.Int, value: cat.id } }
      ),
      query(
        "SELECT use_case FROM category_use_cases WHERE category_id = @id ORDER BY sort_order",
        { id: { type: sql.Int, value: cat.id } }
      ),
      query(
        "SELECT name, description, accent FROM product_types WHERE category_id = @id ORDER BY sort_order",
        { id: { type: sql.Int, value: cat.id } }
      ),
      query(
        `SELECT p.id, p.name, p.slug, p.description AS desc, p.emoji, p.accent,
                p.badge, p.rating, p.review_count AS reviews
         FROM products p
         WHERE p.category_id = @id AND p.is_active = 1`,
        { id: { type: sql.Int, value: cat.id } }
      ),
    ]);

    for (const prod of relatedProducts) {
      prod.crops = (
        await query(
          "SELECT crop_name FROM product_crops WHERE product_id = @id",
          { id: { type: sql.Int, value: prod.id } }
        )
      ).map(r => r.crop_name);
    }

    ok(res, {
      ...cat,
      tags: tags.map(r => r.tag),
      highlights: highlights.map(r => r.highlight),
      useCases: useCases.map(r => r.use_case),
      productTypes,
      relatedProducts,
      stat1: { val: cat.stat1_val, label: cat.stat1_label },
      stat2: { val: cat.stat2_val, label: cat.stat2_label },
      stat3: { val: cat.stat3_val, label: cat.stat3_label },
    });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to fetch category detail.");
  }
});

// Products
app.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;

    let rows;
    if (category) {
      rows = await query(
        `SELECT p.id, p.name, p.slug, c.title AS category, c.slug AS categorySlug,
                p.description AS desc, p.emoji, p.accent, p.badge,
                p.active_ingredient AS activeIngredient, p.dosage, p.rating, p.review_count AS reviews
         FROM products p
         JOIN product_categories c ON p.category_id = c.id
         WHERE c.slug = @cat AND p.is_active = 1
         ORDER BY p.id`,
        { cat: { type: sql.NVarChar, value: category } }
      );
    } else {
      rows = await query(`
        SELECT p.id, p.name, p.slug, c.title AS category, c.slug AS categorySlug,
               p.description AS desc, p.emoji, p.accent, p.badge,
               p.active_ingredient AS activeIngredient, p.dosage, p.rating, p.review_count AS reviews
        FROM products p
        JOIN product_categories c ON p.category_id = c.id
        WHERE p.is_active = 1
        ORDER BY p.id
      `);
    }

    for (const prod of rows) {
      prod.crops = (
        await query(
          "SELECT crop_name FROM product_crops WHERE product_id = @id",
          { id: { type: sql.Int, value: prod.id } }
        )
      ).map(r => r.crop_name);
    }

    ok(res, rows, { count: rows.length });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to fetch products.");
  }
});

// Single product
app.get("/api/products/:slug", async (req, res) => {
  try {
    const rows = await query(
      `SELECT p.*, c.title AS category, c.slug AS categorySlug
       FROM products p
       JOIN product_categories c ON p.category_id = c.id
       WHERE p.slug = @slug AND p.is_active = 1`,
      { slug: { type: sql.NVarChar, value: req.params.slug } }
    );

    if (!rows.length) return fail(res, 404, "Product not found.");

    const product = rows[0];
    product.crops = (
      await query(
        "SELECT crop_name FROM product_crops WHERE product_id = @id",
        { id: { type: sql.Int, value: product.id } }
      )
    ).map(r => r.crop_name);

    ok(res, product);
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to fetch product.");
  }
});

// Blog
app.get("/api/blog", async (req, res) => {
  try {
    const posts = await query(`
      SELECT id, slug, title, category, read_time AS readTime, excerpt, accent,
             is_featured AS isFeatured, published_at AS date
      FROM blog_posts
      WHERE is_active = 1
      ORDER BY published_at DESC
    `);

    ok(res, posts, { count: posts.length });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to fetch blog posts.");
  }
});

app.get("/api/blog/:slug", async (req, res) => {
  try {
    const rows = await query(
      "SELECT * FROM blog_posts WHERE slug = @slug AND is_active = 1",
      { slug: { type: sql.NVarChar, value: req.params.slug } }
    );

    if (!rows.length) return fail(res, 404, "Article not found.");

    ok(res, rows[0]);
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to fetch article.");
  }
});

// Contact
app.post("/api/contact", async (req, res) => {
  const { name, phone, email, crop, location, service, message } = req.body;

  if (!name?.trim() || !phone?.trim()) {
    return fail(res, 400, "Name and phone are required.");
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("name", sql.NVarChar, name.trim())
      .input("phone", sql.NVarChar, phone.trim())
      .input("email", sql.NVarChar, email || "")
      .input("crop", sql.NVarChar, crop || "")
      .input("location", sql.NVarChar, location || "")
      .input("service", sql.NVarChar, service || "")
      .input("message", sql.NVarChar, message || "")
      .query(`
        INSERT INTO contact_inquiries (name, phone, email, crop, location, service, message)
        OUTPUT INSERTED.*
        VALUES (@name, @phone, @email, @crop, @location, @service, @message)
      `);

    res.status(201).json({
      success: true,
      message: "Inquiry received.",
      data: result.recordset[0],
    });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to save inquiry.");
  }
});

// Consultation
app.post("/api/consultation", async (req, res) => {
  const { name, phone, email, location, crop, acreage, urgency, service, message } = req.body;

  if (!name?.trim() || !phone?.trim()) {
    return fail(res, 400, "Name and phone are required.");
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("name", sql.NVarChar, name.trim())
      .input("phone", sql.NVarChar, phone.trim())
      .input("email", sql.NVarChar, email || "")
      .input("location", sql.NVarChar, location || "")
      .input("crop", sql.NVarChar, crop || "")
      .input("acreage", sql.NVarChar, acreage || "")
      .input("urgency", sql.NVarChar, urgency || "")
      .input("service", sql.NVarChar, service || "")
      .input("message", sql.NVarChar, message || "")
      .query(`
        INSERT INTO consultation_requests (name, phone, email, location, crop, acreage, urgency, service, message)
        OUTPUT INSERTED.*
        VALUES (@name, @phone, @email, @location, @crop, @acreage, @urgency, @service, @message)
      `);

    res.status(201).json({
      success: true,
      message: "Consultation request received.",
      data: result.recordset[0],
    });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Failed to save consultation request.");
  }
});

// AI advisory
app.post("/api/ai-advisory", async (req, res) => {
  const { message, crop, stage } = req.body;

  if (!message?.trim()) {
    return fail(res, 400, "Message is required.");
  }

  const result = buildAiReply(message);

  try {
    const pool = await getPool();
    await pool.request()
      .input("message", sql.NVarChar, message)
      .input("crop", sql.NVarChar, crop || null)
      .input("stage", sql.NVarChar, stage || null)
      .input("diagnosis", sql.NVarChar, result.diagnosis)
      .input("product", sql.NVarChar, result.recommendedProduct || null)
      .query(`
        INSERT INTO ai_advisory_logs (user_message, crop, stage, diagnosis, recommended_product)
        VALUES (@message, @crop, @stage, @diagnosis, @product)
      `);
  } catch (logErr) {
    console.warn("Advisory log failed (non-critical):", logErr.message);
  }

  ok(res, result, {
    input: {
      crop: crop || null,
      stage: stage || null,
      message,
    },
  });
});

// 404
app.use((req, res) => fail(res, 404, "Route not found."));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  fail(res, 500, "Internal server error.");
});

// Start
app.listen(PORT, async () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  try {
    await getPool();
  } catch {
    console.warn("⚠️ DB not ready on startup — will retry on first request.");
  }
});