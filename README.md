# SEMS NDIS Services Website

A responsive, modern website for SEMS NDIS Services featuring their Holistic Empowerment Model and comprehensive service offerings.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for better accessibility
- **Tab Navigation**: Easy navigation between different sections
- **Scrollable Content**: Horizontal and vertical scrollable sections
- **Modern UI**: Clean, professional design with animations

## Website Sections

- **Home**: Company introduction and core values
- **About SEMS**: Detailed company information and mission
- **Our Approach**: Holistic Empowerment Model (HEM) breakdown
- **Services**: Complete list of NDIS services offered
- **Contact**: Contact information and inquiry forms

## Quick Start with Docker

### Option 1: Use the Startup Script (Easiest)

```bash
./start-local.sh
```

Then open http://localhost:8080 in your browser.

### Option 2: Manual Docker Commands

```bash
# Build and run the container
docker compose up --build -d

# View in browser
open http://localhost:8080

# Stop the container
docker compose down
```

### Option 3: Direct Docker Run

```bash
# Build the image
docker build -t sems-website .

# Run the container
docker run -d -p 8080:80 --name sems-site sems-website

# Stop and remove
docker stop sems-site && docker rm sems-site
```

## Development

### File Structure

```
.
├── index.html          # Main page with navigation
├── home.html           # Home tab content
├── about.html          # About SEMS tab content
├── approach.html       # HEM approach tab content
├── services.html       # NDIS services tab content
├── contact.html        # Contact information tab content
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile          # Docker build instructions
└── start-local.sh      # Quick start script
```

### Making Changes

1. Edit the HTML, CSS, or JS files
2. Restart the container to see changes:
   ```bash
   docker compose down && docker compose up --build -d
   ```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Nginx (via Docker)
- **Container**: Docker with Alpine Linux

## Contact Information

**SEMS NDIS Services**
- Address: 9 Abbin Court, Rowville, VIC 3178
- Phone: 1300 XXX XXX
- Email: support@semsndis.com.au
- Website: SEMSNDIS.COM.AU

*"Your Journey, Our Care – With Empathy and Strength"*
