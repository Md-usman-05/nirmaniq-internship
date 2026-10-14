SELECT
  p.id,
  p.name,
  COUNT(t.id) AS tower_count,
  COALESCE(AVG(t.floors) / 50.0 * 100, 0) AS avg_floor_completion_pct,
  (
    SELECT t2.name
    FROM towers t2
    WHERE t2.project_id = p.id
    ORDER BY t2.floors DESC
    LIMIT 1
  ) AS highest_risk_tower
FROM projects p
LEFT JOIN towers t ON t.project_id = p.id
WHERE p.is_archived = false
GROUP BY p.id, p.name
ORDER BY p.created_at DESC;
