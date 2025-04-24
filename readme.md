### Konahapuram - Naruto-Themed Interactive Portfolio


## 🍃 Overview

Konahapuram is an interactive, Naruto-themed portfolio website built with Next.js and Three.js. It features a unique 3D village environment that visitors can explore to learn about my skills, projects, and experience as a software engineer.

The portfolio combines the aesthetics of the Naruto universe with modern web technologies to create an immersive and memorable user experience.

## ✨ Features

- **Interactive 3D Village**: Navigate through a custom-built 3D environment inspired by Naruto's Konoha village
- **Day/Night Mode**: Toggle between day and night themes, with the night theme featuring Akatsuki-inspired styling
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Mobile Controls**: Touch-based joystick and directional buttons for mobile navigation
- **Mini-Map**: Real-time position tracking on a mini-map to help with navigation
- **Location-Based Content**: Different buildings in the village represent different sections of the portfolio
- **Fallback 2D View**: Graceful degradation to a 2D card-based layout for devices that can't handle 3D rendering


## 🚀 Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **3D Rendering**: Three.js, React Three Fiber, Drei
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS, CSS Modules
- **Icons**: Lucide React


## 🎮 Controls

### Desktop

- **W**: Move forward
- **S**: Move backward
- **A**: Turn left
- **D**: Turn right
- **Mouse**: Hold left button and move to look around


### Mobile

- **Virtual Joystick**: Move character (left side of screen)
- **Directional Buttons**: Move character (right side of screen)
- **Two-Finger Touch**: Rotate camera


## 🏗️ Project Structure

```plaintext
konahapuram/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Home page with 3D scene and portfolio content
│   ├── village/          # 3D village exploration page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/               # shadcn/ui components
│   ├── naruto-scene.jsx  # Main 3D scene component
│   ├── character-controller.jsx # Character movement logic
│   ├── village-*.jsx     # Village building components
│   ├── mobile-controls.tsx # Mobile-specific controls
│   └── mini-map.jsx      # Navigation mini-map
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/Itaxh1/konahapuram.git
cd konahapuram
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.


## 📱 Performance Considerations

The 3D environment is resource-intensive. The application includes:

- Automatic detection of device capabilities
- Fallback to 2D view for low-performance devices
- Optimized 3D assets with reduced polygon counts
- Lazy loading of 3D components
- Reduced shadow map size and limited lighting for better performance


## 🎨 Customization

You can customize various aspects of the portfolio:

- Edit `app/page.tsx` to update the portfolio content
- Modify 3D models in the `components/` directory
- Adjust the theme colors in `tailwind.config.ts`
- Change the day/night mode styling in `app/globals.css`


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspiration from the Naruto universe created by Masashi Kishimoto
- Three.js and React Three Fiber communities for excellent documentation and examples



## 📞 Contact

Ashwin Kumar Uma Sankar - [ufoundashwin@gmail.com](mailto:ufoundashwin@gmail.com)
Rutuja Anil Shingate - [rutujashingate2000@gmail.com](mailto:rutujashingate2000@gmail.com)

Project Link: [https://github.com/Itaxh1/konahapuram](https://github.com/Itaxh1/konahapuram)

