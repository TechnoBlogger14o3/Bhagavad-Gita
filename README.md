# श्रीमद्भगवद्गीता | Bhagavad Gita: The Divine Song

<div align="center">

![Bhagavad Gita](screenshots/Home%20Page.png)

**An interactive web application to explore the timeless wisdom of Hindu scriptures**

[🌐 Live Demo](https://technoblogger14o3.github.io/Bhagavad-Gita/) | [📖 Features](#-features) | [🚀 Getting Started](#-getting-started) | [💻 Tech Stack](#-tech-stack)

</div>

---

## 📖 About

This is a modern, interactive web application that brings the sacred texts of Hindu philosophy to life. The application features multiple scriptures including the Bhagavad Gita, Hanuman Chalisa, Sunderkand, Bajrang Baan, and Yaksha Prashna, all with beautiful UI, 3D animations, and an intelligent chatbot that helps answer life's questions using the wisdom of the Bhagavad Gita.

## ✨ Features

### 🎯 Core Features

- **📚 Multiple Sacred Texts**: Access five different sacred texts in one application
  - **Bhagavad Gita**: All 18 chapters with 700+ verses
  - **Hanuman Chalisa**: 40 verses of devotion
  - **Sunderkand**: The beautiful chapter from Ramayana
  - **Bajrang Baan**: The powerful prayer to Lord Hanuman
  - **Yaksha Prashna**: 126 questions and answers from Mahabharata

- **🤖 Intelligent Gita Chatbot**: Ask life questions and get relevant verses from the Bhagavad Gita
  - Semantic search with keyword expansion
  - Finds most relevant verses based on your question
  - Clickable verse links to read in detail
  - Works completely offline (no external APIs)

- **🔍 Advanced Search**: Search across all chapters and verses
  - Search by keywords, phrases, or concepts
  - Direct navigation to specific verses
  - Real-time search results

- **🎨 Beautiful 3D Interface**: 
  - Interactive 3D background with animated characters (Krishna & Arjuna)
  - Smooth transitions and animations
  - Responsive design for all devices

- **🎨 Customizable Themes**: 
  - Multiple background gradient options
  - Adjustable font sizes for comfortable reading
  - Smooth theme transitions

- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

- **🌐 Multilingual Support**: 
  - Original Sanskrit text
  - Hindi translations
  - English transliteration and meanings

- **📊 Progress Tracking**: Visual progress indicator showing reading progress

- **🔗 Share Functionality**: Share specific verses with others

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/Home%20Page.png)
*Beautiful home page with text type selector and 3D animated background*

### Bhagavad Gita
![Bhagavad Gita](screenshots/Bhagavad%20Gita.png)
*Browse through all 18 chapters of the Bhagavad Gita*

### Gita Chatbot
![Gita Chatbot](screenshots/Bhagavad%20Gita%20ChatBot.png)
*Ask life questions and get relevant verses from the Bhagavad Gita*

### Hanuman Chalisa
![Hanuman Chalisa](screenshots/Hanuman%20Chalisa.png)
*Read the 40 verses of Hanuman Chalisa*

### Sunderkand
![Sunderkand](screenshots/Sunderkand.png)
*Explore the beautiful chapter from Ramayana*

### Bajrang Baan
![Bajrang Baan](screenshots/Bajrang%20Baan.png)
*The powerful prayer to Lord Hanuman*

### Yaksha Prashna
![Yaksha Prashna](screenshots/Yaksh%20Prashn.png)
*126 questions and answers from Mahabharata*

### Yaksha Prashna Content
![Yaksha Prashna Content](screenshots/Yaksh%20Prashn%20Content.png)
*Detailed view with Hindi translations of questions and answers*

### Background Selector
![Background Selector](screenshots/Background%20Selector.png)
*Customize your reading experience with different background themes*

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### 3D Graphics
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber

### Deployment
- **GitHub Pages** - Static site hosting
- **gh-pages** - Automated deployment

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TechnoBlogger14o3/Bhagavad-Gita.git
cd Bhagavad-Gita
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
Bhagavad-Gita/
├── components/              # React components
│   ├── Arjuna.tsx          # Arjuna 3D character
│   ├── Krishna.tsx         # Krishna 3D character
│   ├── ChapterCard3D.tsx   # 3D chapter cards
│   ├── ChapterList.tsx     # Chapter selection view
│   ├── ChapterView.tsx     # Verse reading view
│   ├── Scene3D.tsx         # 3D scene component
│   ├── GitaChatbot.tsx     # Intelligent chatbot component
│   ├── SearchBar.tsx       # Search functionality
│   ├── BackgroundSelector.tsx  # Theme selector
│   ├── FontSizeControl.tsx     # Font size adjustment
│   ├── ProgressIndicator.tsx   # Reading progress
│   ├── ShareButton.tsx         # Share functionality
│   ├── ErrorBoundary.tsx       # Error handling
│   └── icons/              # Icon components
│       ├── ArrowLeftIcon.tsx
│       ├── ChevronLeftIcon.tsx
│       └── ChevronRightIcon.tsx
├── data/                   # Data files
│   ├── gita.ts            # Bhagavad Gita data (18 chapters, 700+ verses)
│   ├── hanumanChalisa.ts  # Hanuman Chalisa data
│   ├── sunderkand.ts      # Sunderkand data
│   ├── bajrangBaan.ts     # Bajrang Baan data
│   └── yakshaPrashn.ts    # Yaksha Prashna data
├── scripts/               # Utility scripts
│   └── fill-all-hindi-meanings.js
├── screenshots/           # Project screenshots
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
├── types.ts              # TypeScript type definitions
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

---

## 🎯 Usage Guide

### Navigating the Application

1. **Select a Text Type**: Use the text type selector at the top to choose between:
   - भगवद्गीता (Bhagavad Gita)
   - हनुमान चालीसा (Hanuman Chalisa)
   - सुन्दरकाण्ड (Sunderkand)
   - बजरंग बाण (Bajrang Baan)
   - यक्ष प्रश्न (Yaksha Prashna)

2. **Browse Chapters**: Click on any chapter card to view its contents

3. **Read Verses**: 
   - Navigate through verses using Previous/Next buttons
   - Each verse shows:
     - Original Sanskrit text
     - Transliteration
     - Hindi meaning
     - English meaning

4. **Search**: Use the search bar to find specific verses or chapters

5. **Customize**: 
   - Change background theme using the background selector
   - Adjust font size for comfortable reading

6. **Use the Chatbot** (Bhagavad Gita only):
   - Click the chat button (bottom-right corner)
   - Ask questions about life, duty, karma, stress, etc.
   - Get relevant verses with clickable links

### Example Chatbot Questions

- "How to deal with stress?"
- "What is my duty?"
- "How to find happiness?"
- "What happens after death?"
- "How to control anger?"
- "What is karma?"
- "How to meditate?"

---

## 🤖 How the Chatbot Works

The Gita Chatbot uses an intelligent semantic search algorithm to find relevant verses:

### 1. Keyword Expansion
The chatbot expands your query using a predefined keyword mapping:
- **Stress** → anxiety, worry, fear, trouble, difficulty, sorrow, grief
- **Duty** → dharma, responsibility, obligation, work, action, karma
- **Happiness** → joy, peace, bliss, contentment, satisfaction
- And many more...

### 2. Relevance Scoring
Each verse is scored based on:
- **Exact phrase matches** (highest priority)
- **Expanded keyword matches**
- **Original word matches**
- **Field-specific matches** (meaning, Hindi meaning, chapter summary)

### 3. Results Ranking
Verses are sorted by relevance score and the top 5 most relevant verses are returned.

### 4. Response Generation
The chatbot formats the response with:
- Chapter number and name
- Verse number and meaning
- Clickable links to read the full verse

**Note**: The chatbot works completely offline - no external APIs or internet connection required!

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Build and Deploy**:
   ```bash
   npm run deploy
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **gh-pages** branch and **/ (root)** folder
   - Click **Save**

3. **Access Your Site**:
   Your app will be available at:
   ```
   https://technoblogger14o3.github.io/Bhagavad-Gita/
   ```

> **Note**: It may take a few minutes for the site to become available after enabling GitHub Pages.

---

## 🌟 About the Sacred Texts

### Bhagavad Gita
The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It presents a conversation between Prince Arjuna and Lord Krishna, who serves as his charioteer and spiritual guide. The text addresses the moral and philosophical dilemmas faced by Arjuna on the battlefield of Kurukshetra.

### Hanuman Chalisa
Hanuman Chalisa is a Hindu devotional hymn (stotra) addressed to Lord Hanuman. It was authored by Tulsidas in the Awadhi language and is his best-known text. The word "chalisa" is derived from "chalis", which means the number forty in Hindi, as the Hanuman Chalisa has 40 verses.

### Sunderkand
Sunderkand is the fifth book of the Ramayana. It describes the journey of Hanuman to Lanka in search of Sita. The name "Sunderkand" means "beautiful chapter" and it is considered one of the most important parts of the Ramayana.

### Bajrang Baan
Bajrang Baan is a powerful prayer dedicated to Lord Hanuman. It is believed to be composed by Tulsidas and is known for its protective and powerful verses. The name "Bajrang" refers to Lord Hanuman, and "Baan" means arrow.

### Yaksha Prashna
Yaksha Prashna is a dialogue between Yudhishthira and a Yaksha (a nature spirit) in the Mahabharata. It consists of 126 questions and answers that test Yudhishthira's wisdom and righteousness. The questions cover various aspects of life, duty, and philosophy.

---

## 🎨 Features in Detail

### 3D Background Scene
- Interactive 3D characters (Krishna and Arjuna)
- Smooth animations and transitions
- Only visible on the home page
- Built with Three.js and React Three Fiber

### Search Functionality
- Real-time search across all chapters and verses
- Searches in:
  - Chapter names
  - Verse text
  - Meanings (English and Hindi)
  - Transliterations
- Direct navigation to matching verses

### Progress Indicator
- Visual progress bar showing reading progress
- Updates as you navigate through verses
- Helps track your reading journey

### Share Button
- Share specific verses with others
- Generates shareable links
- Easy sharing on social media

### Error Boundary
- Graceful error handling
- User-friendly error messages
- Prevents application crashes

---

## 🔧 Development

### Adding New Text Types

1. Create a new data file in `data/` directory following the structure:
   ```typescript
   export const newText: Chapter[] = [
     {
       id: 1,
       chapter_number: 1,
       name: "Chapter Name",
       name_meaning: "Chapter Name Meaning",
       summary: "Chapter summary",
       verses_count: 10,
       verses: [
         {
           id: 1,
           verse_number: 1,
           chapter_number: 1,
           text: "Sanskrit text",
           transliteration: "Transliteration",
           hindi_meaning: "Hindi meaning",
           meaning: "English meaning"
         }
       ]
     }
   ];
   ```

2. Add the text type to `App.tsx`:
   - Add to `TextType` union type
   - Add to `textConfigs` object
   - Add button in text type selector

### Customizing Themes

Edit `components/BackgroundSelector.tsx` to add new background themes.

### Extending Chatbot

To improve chatbot search:
1. Add more keywords to `keywordMapping` in `GitaChatbot.tsx`
2. Adjust scoring weights in `searchRelevantVerses` function
3. Modify `generateResponse` for different response formats

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

- Inspired by the timeless wisdom of the Bhagavad Gita and other sacred texts
- Built with love and devotion for spreading the teachings of Sanatana Dharma
- Special thanks to all the contributors and the open-source community

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you have any questions or suggestions, please open an issue on GitHub.

---

<div align="center">

**May this application serve as a gateway to explore the profound teachings of the sacred texts.**

*Built with ❤️ and devotion*

[⬆ Back to Top](#श्रीमद्भगवद्गीता--bhagavad-gita-the-divine-song)

</div>
