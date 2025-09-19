# Blue Carbon Registry & MRV System

**SIH 2025 - Problem Statement 25038**

A blockchain-based platform for transparent, fast, and inclusive blue carbon credit verification and trading, targeting India's coastal ecosystems.

## Project Overview

Digital MRV (Measurement, Reporting, Verification) system that:
- Reduces verification time from 6-9 months to near-instant
- Ensures transparency through blockchain immutability  
- Includes small stakeholders (panchayats, local NGOs)
- Focuses on mangroves, seagrasses, and salt marshes

## Architecture

```
blue-carbon-registry/
├── frontend/          # Next.js PWA with HeroUI
├── backend/           # Flask API + PostgreSQL
├── blockchain/        # Smart contracts (Solidity)
└── README.md
```

## Tech Stack

**Frontend:** Next.js, HeroUI, TailwindCSS, Leaflet, Web3.js, Better-Auth  
**Backend:** Flask, PostgreSQL, Web3.py  
**Blockchain:** Solidity, Polygon/Mumbai Testnet  
**DevOps:** Docker, Heroku/AWS

## Tasks

### Phase 1: Foundation
- [ ] Project setup & environment
- [ ] Database schema design
- [ ] Basic authentication flow
- [ ] UI skeleton (Admin/NGO dashboards)

### Phase 2: Core Features
- [ ] Smart contract development
- [ ] Backend-blockchain integration
- [ ] Project submission workflow
- [ ] Verification system

### Phase 3: Integration
- [ ] End-to-end testing
- [ ] UI polish & animations
- [ ] Demo data population
- [ ] Presentation prep

## User Roles

- **NCCR Admin:** Verify projects, mint carbon credits
- **NGOs/Panchayats:** Submit restoration projects, upload data
- **Validators:** Review and approve carbon calculations

## Quick Start

```bash
# Clone repository
git clone <repo-url>
cd blue-carbon-registry

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup  
cd ../backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run

# Blockchain setup
cd ../blockchain
npm install
npx hardhat compile
npx hardhat test
```


## Known Issues

- [ ] Dummy Issue
- [✓] Dummy Solved


## Future Enhancements

- Integration with National Carbon Registry
- IoT sensor data streams
- AI-powered carbon calculation
- AR site visualization
- Mobile app (Flutter)

---
*Built for India's blue carbon potential - 🇮🇳 Making coastal restoration profitable and transparent*