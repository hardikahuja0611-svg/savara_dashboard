export const processInsights = (rawData, teacherId = 'all') => {
  // 1. Remove identical entries (The "Hidden Twist")
  const seen = new Set();
  const cleanData = rawData.filter(item => {
    const key = `${item.teacher_id}-${item.activity_type}-${item.created_at}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 2. Filter data
  const filtered = teacherId === 'all' 
    ? cleanData 
    : cleanData.filter(d => d.teacher_id === teacherId);

  // 3. Simple Aggregations
  const stats = {
    lessons: filtered.filter(d => d.activity_type === 'lesson').length,
    quizzes: filtered.filter(d => d.activity_type === 'quiz').length,
    assessments: filtered.filter(d => d.activity_type === 'assessment').length,
  };

  // 4. Chart data
  const trendsMap = filtered.reduce((acc, curr) => {
    const date = curr.created_at.split(' ')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(trendsMap).sort().map(date => ({
    date,
    activities: trendsMap[date]
  }));

  const uniqueTeachers = Array.from(new Set(cleanData.map(t => 
    JSON.stringify({id: t.teacher_id, name: t.teacher_name})
  ))).map(s => JSON.parse(s));

  return { stats, chartData, uniqueTeachers };
};