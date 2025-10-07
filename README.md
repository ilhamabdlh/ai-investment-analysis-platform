# 🚀 AI Investment Analysis Platform

Platform analisis investasi berbasis AI yang membantu investor membuat keputusan investasi yang lebih baik dengan analisis komprehensif terhadap perusahaan target.

![Platform Status](https://img.shields.io/badge/status-active-success)
![Python](https://img.shields.io/badge/python-3.13-blue)
![Django](https://img.shields.io/badge/django-5.2.6-green)
![React](https://img.shields.io/badge/react-18.x-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

## 📋 Deskripsi

AI Investment Analysis Platform adalah aplikasi web full-stack yang menyediakan analisis mendalam terhadap perusahaan untuk membantu keputusan investasi. Platform ini mengintegrasikan berbagai jenis analisis termasuk analisis pasar, analisis kompetitor, analisis tim kunci, dan analisis persepsi publik.

## ✨ Fitur Utama

### 🎯 Dashboard Analisis
- **Overview Stats**: Ringkasan statistik investasi dan analisis
- **Recent Analyses**: Analisis terbaru yang telah dilakukan
- **Upcoming Tasks**: Tugas dan analisis yang akan datang

### 🏢 Analisis Perusahaan
- **High-Level Analysis**: Analisis tingkat tinggi terhadap perusahaan
- **Market Analysis**: Analisis pasar dan positioning
- **Competitive Analysis**: Analisis kompetitor dan benchmarking
- **Key Individuals Analysis**: Analisis tim manajemen dan key persons
- **Perception Analysis**: Analisis persepsi publik dan brand reputation

### 📊 Manajemen Data
- **Company Management**: CRUD operasi untuk data perusahaan
- **Lead Generation**: Tracking dan manajemen prospek investasi
- **Investment Tracking**: Monitoring portfolio investasi

### 🔐 Authentication & Authorization
- Token-based authentication
- Role-based access control
- Secure API endpoints

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework 3.15.2
- **Database**: PostgreSQL (production) / SQLite3 (development)
- **Authentication**: Token Authentication (djangorestframework-simplejwt)
- **CORS**: django-cors-headers
- **Admin**: django-import-export

### Frontend
- **Framework**: React 18.x + TypeScript
- **Build Tool**: Vite
- **UI Components**: Custom UI Components (shadcn-inspired)
- **HTTP Client**: Axios
- **Routing**: React Router
- **State Management**: React Context API

### DevOps & Deployment
- **Backend Server**: Gunicorn
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt
- **Version Control**: Git & GitHub

## 📦 Installation

### Prerequisites
- Python 3.13+
- Node.js 18+
- npm atau yarn
- PostgreSQL (untuk production)

### Backend Setup

1. Clone repository:
```bash
git clone https://github.com/ilhamabdlh/ai-investment-analysis-platform.git
cd ai-investment-analysis-platform
```

2. Buat virtual environment dan install dependencies:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

3. Jalankan migrasi database:
```bash
python manage.py migrate
```

4. Buat superuser:
```bash
python manage.py createsuperuser
```

5. Jalankan development server:
```bash
python manage.py runserver
```

Backend akan berjalan di `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/token/          # Login & get token
```

### Dashboard
```
GET  /api/dashboard/stats/              # Dashboard statistics
GET  /api/dashboard/recent_analyses/    # Recent analyses
GET  /api/dashboard/upcoming_tasks/     # Upcoming tasks
```

### Companies
```
GET    /api/companies/                  # List all companies
POST   /api/companies/                  # Create company
GET    /api/companies/{id}/             # Get company detail
PUT    /api/companies/{id}/             # Update company
DELETE /api/companies/{id}/             # Delete company
GET    /api/companies/{id}/full_analysis/  # Get full analysis
```

### Analyses
```
GET    /api/analyses/                   # List all analyses
POST   /api/analyses/                   # Create analysis
GET    /api/analyses/{id}/              # Get analysis detail
PUT    /api/analyses/{id}/              # Update analysis
DELETE /api/analyses/{id}/              # Delete analysis
```

### Leads
```
GET    /api/leads/                      # List all leads
POST   /api/leads/                      # Create lead
GET    /api/leads/{id}/                 # Get lead detail
PUT    /api/leads/{id}/                 # Update lead
DELETE /api/leads/{id}/                 # Delete lead
```

## 🚀 Deployment

### Production Setup

Untuk deployment production, ikuti langkah-langkah berikut:

1. **Update Environment Variables**
   - Set `DEBUG=False`
   - Generate new `SECRET_KEY`
   - Configure database (PostgreSQL)
   - Set `ALLOWED_HOSTS`

2. **Build Frontend**
```bash
npm run build
```

3. **Collect Static Files (Backend)**
```bash
python manage.py collectstatic --noinput
```

4. **Setup Web Server**
   - Configure Nginx as reverse proxy
   - Setup SSL with Let's Encrypt
   - Configure Gunicorn for Django

5. **Production URLs**
   - API: `https://api.teoremaintelligence.com`
   - Frontend: `https://app.teoremaintelligence.com`

Untuk panduan deployment lengkap, lihat dokumentasi deployment.

## 📁 Struktur Proyek

```
ai-investment-analysis-platform/
├── backend/
│   ├── api/                    # Django app untuk API
│   │   ├── migrations/         # Database migrations
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   └── urls.py            # API routes
│   ├── core/                   # Django project settings
│   │   ├── settings.py        # Main settings
│   │   ├── urls.py            # Root URL configuration
│   │   └── wsgi.py            # WSGI configuration
│   ├── manage.py              # Django management script
│   └── requirements.txt       # Python dependencies
│
├── src/
│   ├── components/            # React components
│   │   ├── dashboard.tsx      # Dashboard component
│   │   ├── company-selector.tsx
│   │   ├── market-analysis.tsx
│   │   ├── competitive-analysis.tsx
│   │   ├── key-individuals.tsx
│   │   └── perception-analysis.tsx
│   ├── context/               # React context
│   │   └── company-context.tsx
│   ├── services/              # API services
│   │   └── api.ts             # Axios configuration & API calls
│   └── utils/                 # Utility functions
│
├── index.html                 # HTML template
├── package.json              # Node.js dependencies
├── vite.config.ts            # Vite configuration
└── README.md                 # Documentation
```

## 🔒 Security Features

- ✅ Token-based authentication
- ✅ CORS configuration
- ✅ SQL injection protection (Django ORM)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ HTTPS enforcement (production)
- ✅ Secure headers configuration

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
npm run test
```

## 📝 API Documentation

API documentation tersedia di:
- **Development**: `http://localhost:8000/api/`
- **Production**: `https://api.teoremaintelligence.com/api/`

## 🤝 Contributing

Kontribusi selalu disambut baik! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## 👥 Tim Pengembang

- **Ilham Abdullah** - *Lead Developer* - [@ilhamabdlh](https://github.com/ilhamabdlh)

## 📧 Kontak

Untuk pertanyaan atau dukungan, silakan hubungi:
- Email: info@teoremaintelligence.com
- Website: https://teoremaintelligence.com

## 🙏 Acknowledgments

- Terima kasih kepada semua kontributor yang telah membantu project ini
- Terinspirasi oleh best practices dari komunitas Django dan React

---

**⭐ Star project ini jika Anda merasa berguna!**

Made with ❤️ by Teorema Intelligence Team
