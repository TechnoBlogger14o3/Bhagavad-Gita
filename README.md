# श्रीमद्भगवद्गीता | Bhagavad Gita: The Divine Song

An interactive web application to explore the chapters and shlokas (verses) of the Bhagavad Gita, featuring an elegant interface to navigate through Lord Krishna's divine discourse to Arjuna.

## ✨ Features

- **Chapter Navigation**: Browse through all 18 chapters of the Bhagavad Gita
- **Verse Reading**: Read individual verses with Sanskrit text, transliteration, and meaning
- **Interactive UI**: Smooth transitions and intuitive navigation between chapters and verses
- **Beautiful Design**: Modern, responsive interface with a warm color scheme inspired by the sacred text
- **Sanskrit Support**: Display of original Sanskrit verses with proper typography

## 🛠️ Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via inline classes)

## 📋 Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager
- **Gemini API Key** (for any AI features, if applicable)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Bhagavad-Gita
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

1. Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. Add your Gemini API key (if needed):
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the Development Server

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
Bhagavad-Gita/
├── components/          # React components
│   ├── Arjuna.tsx      # Arjuna character component
│   ├── Krishna.tsx     # Krishna character component
│   ├── ChapterList.tsx # Chapter selection view
│   ├── ChapterView.tsx # Verse reading view
│   ├── Scene.tsx       # Scene component
│   └── icons/          # Icon components
├── data/
│   └── gita.ts         # Bhagavad Gita data
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## 🎯 Usage

1. **Select a Chapter**: On the home page, click on any of the 18 chapters to view its contents
2. **Read Verses**: Navigate through verses using the Previous/Next buttons
3. **Return to Chapters**: Click the "Back to Chapters" button to return to the chapter list

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to GitHub Pages (manual deployment)

## 🚀 Deployment

### Quick Deployment (Recommended)

The easiest way to deploy is using the manual deployment method:

```bash
npm run deploy
```

**After running the deploy command, enable GitHub Pages:**

1. Go to your repository on GitHub: https://github.com/TechnoBlogger14o3/Bhagavad-Gita
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select **gh-pages** branch and **/ (root)** folder
5. Click **Save**

Your app will be available at: `https://technoblogger14o3.github.io/Bhagavad-Gita/`

> **Note:** It may take a few minutes for the site to become available after enabling GitHub Pages.

### Automatic Deployment (GitHub Actions)

This project also includes a GitHub Actions workflow for automatic deployment. To use it:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on the next push to `main`

The workflow will build and deploy your app automatically whenever you push changes to the `main` branch.

## 🌟 About the Bhagavad Gita

The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It presents a conversation between Prince Arjuna and Lord Krishna, who serves as his charioteer and spiritual guide. The text addresses the moral and philosophical dilemmas faced by Arjuna on the battlefield of Kurukshetra.

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

Inspired by the timeless wisdom of the Bhagavad Gita.

---

*May this application serve as a gateway to explore the profound teachings of the Bhagavad Gita.*
