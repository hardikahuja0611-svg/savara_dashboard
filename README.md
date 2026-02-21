# SAVRA | Principal's Analytics Dashboard

A specialized monitoring tool built for school administrators to track teacher engagement, lesson consistency, and activity trends.

## 🚀 Live Demo
https://savara-dashboard.vercel.app/

## 🧠 System Thinking & Problem Solving

The core of this challenge was not just displaying data, but ensuring its integrity. I implemented a custom **Insights Engine** to handle the following:

### 1. Data Deduplication (The "Hidden Twist")
Real-world educational data often contains overlaps. My engine uses a composite key strategy:
- It creates a unique signature for every activity based on `teacher_id`, `activity_type`, and `timestamp`.
- It filters out 100% identical entries before they reach the UI, ensuring the Principal sees accurate totals.

### 2. Analytical Aggregation
Instead of just listing rows, the system categorizes data into three key metrics:
- **Lessons**: Content delivery tracking.
- **Quizzes**: Assessment frequency.
- **Assessments**: Student evaluation volume.

### 3. Automated Insights
I added a logic layer that compares Lesson volume vs. Quiz volume. It provides a dynamic recommendation to the administrator on whether to focus more on instruction or evaluation.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS (for a clean, professional "SaaS" look)
- **Charts**: Recharts (for responsive activity trends)
- **Language**: JavaScript (ES6+)

## 🛠️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/hardikahuja0611-svg/savara_dashboard.git