export type SqlDialect = 'mysql' | 'postgres' | 'sqlserver' | 'sqlite' | 'oracle';

export interface SqlGeneratorOptions {
  prompt: string;
  dialect: SqlDialect;
  schema?: string;
  operationType?: 'select' | 'join' | 'window' | 'insert' | 'update' | 'delete' | 'schema';
}

export interface GeneratedSqlResult {
  sql: string;
  dialect: SqlDialect;
  explanation: {
    step: string;
    description: string;
  }[];
  suggestedIndexes: string[];
  performanceTips: string[];
}

export function generateSqlFromPrompt(options: SqlGeneratorOptions): GeneratedSqlResult {
  const { prompt, dialect, schema } = options;
  const p = prompt.toLowerCase();

  // Dialect specific helpers
  const getLimitClause = (num: number, offset = 0) => {
    if (dialect === 'sqlserver') {
      return offset > 0 ? `OFFSET ${offset} ROWS FETCH NEXT ${num} ROWS ONLY` : `/* TOP ${num} applied in SELECT */`;
    }
    if (dialect === 'oracle') {
      return `FETCH FIRST ${num} ROWS ONLY`;
    }
    return offset > 0 ? `LIMIT ${num} OFFSET ${offset}` : `LIMIT ${num}`;
  };

  const getDateDiffClause = (days: number) => {
    if (dialect === 'postgres') return `NOW() - INTERVAL '${days} days'`;
    if (dialect === 'mysql') return `DATE_SUB(NOW(), INTERVAL ${days} DAY)`;
    if (dialect === 'sqlserver') return `DATEADD(day, -${days}, GETDATE())`;
    if (dialect === 'oracle') return `SYSDATE - ${days}`;
    return `datetime('now', '-${days} days')`;
  };

  let sql = '';
  const explanation: { step: string; description: string }[] = [];
  const suggestedIndexes: string[] = [];
  const performanceTips: string[] = [];

  // Pattern 1: Highest paid employees / Top N
  if (p.includes('employee') || p.includes('salary') || p.includes('highest paid') || p.includes('sales department')) {
    if (dialect === 'sqlserver') {
      sql = `SELECT TOP 5
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary,
    e.hire_date
FROM employees e
INNER JOIN departments d 
    ON e.department_id = d.id
WHERE d.department_name = 'Sales'
    AND e.hire_date >= '2022-01-01'
ORDER BY e.salary DESC;`;
    } else if (dialect === 'oracle') {
      sql = `SELECT
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary,
    e.hire_date
FROM employees e
INNER JOIN departments d 
    ON e.department_id = d.id
WHERE d.department_name = 'Sales'
    AND e.hire_date >= TO_DATE('2022-01-01', 'YYYY-MM-DD')
ORDER BY e.salary DESC
FETCH FIRST 5 ROWS ONLY;`;
    } else {
      sql = `SELECT
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary,
    e.hire_date
FROM employees e
INNER JOIN departments d 
    ON e.department_id = d.id
WHERE d.department_name = 'Sales'
    AND e.hire_date >= '2022-01-01'
ORDER BY e.salary DESC
LIMIT 5;`;
    }

    explanation.push(
      { step: '1. FROM & JOIN', description: 'Joins the "employees" table (e) with "departments" (d) on department_id to fetch human-readable department names.' },
      { step: '2. WHERE Filter', description: 'Filters records strictly to department_name = "Sales" and hire_date on or after January 1st, 2022.' },
      { step: '3. ORDER BY & Limit', description: `Sorts descending by salary (highest first) and caps output to top 5 rows using ${dialect.toUpperCase()} pagination syntax.` }
    );

    suggestedIndexes.push(
      'CREATE INDEX idx_emp_dept_salary ON employees(department_id, hire_date, salary DESC);',
      'CREATE INDEX idx_dept_name ON departments(department_name);'
    );
    performanceTips.push(
      'Using a composite index on (department_id, hire_date, salary) eliminates table scans and enables index-only sorting.'
    );
  }

  // Pattern 2: Window Functions / Ranking / Partition
  else if (p.includes('running total') || p.includes('rank') || p.includes('window') || p.includes('partition') || p.includes('per category')) {
    sql = `WITH CategorySales AS (
    SELECT
        p.category_name,
        o.order_date,
        oi.product_id,
        oi.quantity * oi.unit_price AS line_total,
        ROW_NUMBER() OVER (
            PARTITION BY p.category_name 
            ORDER BY (oi.quantity * oi.unit_price) DESC
        ) AS rank_in_category,
        SUM(oi.quantity * oi.unit_price) OVER (
            PARTITION BY p.category_name 
            ORDER BY o.order_date
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS running_category_revenue
    FROM order_items oi
    INNER JOIN orders o ON oi.order_id = o.id
    INNER JOIN products p ON oi.product_id = p.id
    WHERE o.status = 'completed'
)
SELECT 
    category_name,
    order_date,
    product_id,
    line_total,
    rank_in_category,
    running_category_revenue
FROM CategorySales
WHERE rank_in_category <= 3
ORDER BY category_name, order_date;`;

    explanation.push(
      { step: '1. Common Table Expression (CTE)', description: 'Pre-aggregates line item totals with category metadata and orders.' },
      { step: '2. ROW_NUMBER() Windowing', description: 'Ranks individual sales items within each category partition from highest to lowest revenue.' },
      { step: '3. Cumulative Running Sum', description: 'Calculates the historical cumulative revenue progression for each product category.' }
    );
    suggestedIndexes.push('CREATE INDEX idx_orders_status_date ON orders(status, order_date);');
    performanceTips.push('Window functions with PARTITION BY benefit heavily from pre-sorted B-tree indexes matching partition and order columns.');
  }

  // Pattern 3: Monthly Active Users / Cohorts / Aggregates
  else if (p.includes('monthly') || p.includes('active users') || p.includes('cohort') || p.includes('spend >') || p.includes('group by')) {
    const dateExtract =
      dialect === 'postgres'
        ? `TO_CHAR(o.created_at, 'YYYY-MM')`
        : dialect === 'mysql'
        ? `DATE_FORMAT(o.created_at, '%Y-%m')`
        : dialect === 'sqlserver'
        ? `FORMAT(o.created_at, 'yyyy-MM')`
        : `strftime('%Y-%m', o.created_at)`;

    sql = `SELECT
    ${dateExtract} AS order_month,
    u.country,
    COUNT(DISTINCT u.id) AS total_active_customers,
    COUNT(o.id) AS total_orders_placed,
    SUM(o.total_amount) AS gross_revenue,
    ROUND(AVG(o.total_amount), 2) AS average_order_value
FROM users u
INNER JOIN orders o 
    ON u.id = o.user_id
WHERE o.status = 'completed'
    AND o.created_at >= ${getDateDiffClause(365)}
GROUP BY ${dateExtract}, u.country
HAVING SUM(o.total_amount) > 1000
ORDER BY order_month DESC, gross_revenue DESC;`;

    explanation.push(
      { step: '1. Time Granularity Extraction', description: `Extracts year-month format using dialect-specific date formatting (${dialect.toUpperCase()}).` },
      { step: '2. Customer Aggregations', description: 'Computes distinct customer counts, total order volume, gross revenue, and AOV per country.' },
      { step: '3. HAVING Threshold Filter', description: 'Filters grouped buckets to only retain country-month cohorts generating over $1,000 in gross sales.' }
    );
    suggestedIndexes.push('CREATE INDEX idx_orders_user_created ON orders(user_id, status, created_at, total_amount);');
    performanceTips.push('Place status in the index before created_at for efficient index range scanning on completed orders.');
  }

  // Pattern 4: Delete / Soft Delete / Cleanup
  else if (p.includes('delete') || p.includes('clean') || p.includes('inactive') || p.includes('purge')) {
    sql = `-- Recommended Production Soft Delete (Avoids Data Loss)
UPDATE users
SET 
    is_active = FALSE,
    deleted_at = ${dialect === 'sqlserver' ? 'GETDATE()' : dialect === 'oracle' ? 'SYSDATE' : 'NOW()'}
WHERE last_login_at < ${getDateDiffClause(730)}
    AND id NOT IN (
        SELECT DISTINCT user_id 
        FROM orders 
        WHERE created_at >= ${getDateDiffClause(730)}
    );

-- Hard Delete (Permanent Purge if required)
-- DELETE FROM users
-- WHERE is_active = FALSE AND deleted_at < ${getDateDiffClause(90)};`;

    explanation.push(
      { step: '1. Soft Delete Safety Pattern', description: 'Safely marks inactive user records as deactivated and records deleted_at timestamp instead of immediate permanent deletion.' },
      { step: '2. Subquery Exemption', description: 'Ensures users who placed any recent transactions are protected from accidental purge.' }
    );
    suggestedIndexes.push('CREATE INDEX idx_users_last_login ON users(last_login_at, is_active);');
    performanceTips.push('Always execute mass updates or deletes in batches (e.g. 5,000 rows with a cursor/loop) in high-traffic production databases to prevent row lock contention.');
  }

  // Pattern 5: Create Table / Schema definition
  else if (p.includes('create table') || p.includes('schema') || p.includes('table for') || p.includes('migration')) {
    const idType =
      dialect === 'postgres'
        ? 'BIGSERIAL PRIMARY KEY'
        : dialect === 'mysql'
        ? 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY'
        : dialect === 'sqlserver'
        ? 'BIGINT IDENTITY(1,1) PRIMARY KEY'
        : dialect === 'oracle'
        ? 'NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY'
        : 'INTEGER PRIMARY KEY AUTOINCREMENT';

    const timestampType =
      dialect === 'postgres'
        ? 'TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP'
        : dialect === 'sqlserver'
        ? 'DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET()'
        : 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP';

    sql = `CREATE TABLE users (
    id ${idType},
    uuid VARCHAR(36) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'customer',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    metadata JSON ${dialect === 'postgres' ? 'B' : ''} NULL,
    created_at ${timestampType},
    updated_at ${timestampType} ${dialect === 'mysql' ? 'ON UPDATE CURRENT_TIMESTAMP' : ''}
);

CREATE TABLE orders (
    id ${idType},
    user_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    created_at ${timestampType},
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_orders_user_status ON orders(user_id, status);`;

    explanation.push(
      { step: '1. Primary Key Strategy', description: `Employs optimized 64-bit auto-incrementing surrogate keys with ${dialect.toUpperCase()} native syntax.` },
      { step: '2. Constraints & Foreign Keys', description: 'Enforces strict UNIQUE constraints on emails and foreign key integrity with cascading delete protection.' },
      { step: '3. Audit Timestamps', description: 'Includes created_at and updated_at with timezone awareness.' }
    );
    suggestedIndexes.push('CREATE INDEX idx_users_email ON users(email);');
    performanceTips.push('JSONB columns in PostgreSQL support GIN indexing for ultra-fast nested key queries.');
  }

  // Pattern 6: General Default Dynamic Parser
  else {
    // Dynamic synthesis based on user keywords
    const tableName = p.includes('order') ? 'orders' : p.includes('product') ? 'products' : p.includes('customer') ? 'customers' : 'records';
    const limitClause = getLimitClause(20);

    sql = `SELECT
    t.id,
    t.name,
    t.status,
    t.created_at,
    COUNT(r.id) AS related_count
FROM ${tableName} t
LEFT JOIN related_items r 
    ON t.id = r.parent_id
WHERE t.status = 'active'
    AND t.created_at >= ${getDateDiffClause(30)}
GROUP BY t.id, t.name, t.status, t.created_at
ORDER BY t.created_at DESC
${limitClause};`;

    explanation.push(
      { step: '1. Base Query', description: `Extracts active rows from ${tableName} with LEFT JOIN to count associated child records.` },
      { step: '2. Time Filtering', description: `Filters to records updated within the last 30 days using ${dialect.toUpperCase()} native interval functions.` },
      { step: '3. Aggregation & Limit', description: 'Groups by selected identifier attributes and orders chronologically descending.' }
    );
    suggestedIndexes.push(`CREATE INDEX idx_${tableName}_status_date ON ${tableName}(status, created_at DESC);`);
    performanceTips.push('Avoid SELECT * in production; explicitly list only needed columns to leverage covering indexes.');
  }

  return {
    sql,
    dialect,
    explanation,
    suggestedIndexes,
    performanceTips,
  };
}
