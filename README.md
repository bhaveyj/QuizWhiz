# QuizWhiz

A full-stack quiz application with a Node.js backend and Vite-powered frontend.  
- 🔗 Backend: Hosted on [Render](https://quizwhiz-lc4j.onrender.com)
- 🔗 Frontend: Hosted on [Vercel](https://quiz-whiz-lemon.vercel.app/)

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: Vite + React
- **Deployment**: Render (Backend) + Vercel (Frontend)

---

## 📂 Project Structure

QuizWhiz/
├── backend/ # Node.js + Express API
│ └── package.json
├── frontend/ # Vite + React frontend
│ └── package.json
└── README.md


---

## 🚀 Deployment Instructions

### 🔧 Backend (Render)

1. **Push your code to GitHub**.
2. Go to [https://render.com](https://render.com) and create a new **Web Service**.
3. Set the **Root Directory** to `backend`.
4. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add the following **Environment Variables** in Render:

   | Key              | Value                            |
   |------------------|----------------------------------|
   | `DATABASE_URL`   | Your MongoDB connection string   |
   | `GEMINI_API_KEY` | Your Gemini API key              |
   | `JWT_SECRET`     | Your JWT secret                  |

6. Make sure your backend listens to `process.env.PORT`.

7. ✅ Backend deployed at `https://your-backend-name.onrender.com`

---

### 🌐 Frontend (Vercel)

1. Go to [https://vercel.com](https://vercel.com) and import your GitHub repo.
2. During setup:
   - Set the **Root Directory** to `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Add this **Environment Variable** in Vercel:

   | Key                 | Value                                      |
   |---------------------|--------------------------------------------|
   | `VITE_BACKEND_URL`  | `https://your-backend-name.onrender.com`  |

4. ✅ Frontend deployed at `https://your-frontend-name.vercel.app`

---

## 🔄 Connecting Frontend to Backend

In `frontend/config.js`:

```js
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

✅ Local Development
1. Backend
cd backend
npm install
npm run dev   # or npm start
2. Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
🛡️ Environment Variables Summary
Render (Backend)
ini
Copy
Edit
DATABASE_URL=<your-mongodb-url>
GEMINI_API_KEY=<your-gemini-api-key>
JWT_SECRET=<your-jwt-secret>
Vercel (Frontend)
ini
Copy
Edit
VITE_BACKEND_URL=https://your-backend-name.onrender.com
