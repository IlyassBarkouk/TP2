# 🗳️ Application de Présentation multi-surface en React

Une application React qui permet d'ajouter des questions personnalisées à des événements (position, taille, couleur, anonymat...).

## 🚀 Fonctionnalités

- Ajout de questions à un événement
- Personnalisation des questions (auteur, couleur, taille, position)
- Option pour poser une question de manière anonyme
- Option chez l'admin pour supprimer les questions
- Navigation entre les événements
- Gestion via Redux

---

## 🛠️ Installation

### 1. Cloner le projet

          git clone https://github.com/ProGitMounir/TP2_TIW8.git
          cd TP2

### 2. Installer les dépendances
      cd server
      npm install
      cd ..
      cd client
      npm install
      cd..

## ▶️ Lancer le projet en développement
    # Lancer le serveur backend
        cd server
        cd src
        npm start   

    # Dans un autre terminal, lancer le frontend
        cd client
        npm run dev

Le projet sera disponible sur http://localhost:5173 (ou selon Vite).

## ✅ Pré-requis

    Node.js >= 18.x

    npm >= 9.x

    Git

    Un navigateur moderne (Chrome, Firefox...)

## 🧪 Technologies utilisées

    ⚛️ React

    🧰 Redux Toolkit

    🔁 React Router

    🎨 TailwindCSS (ou autre)

    🆔 uuid

    🧪 TypeScript

## 🗂️ Structure du projet
       my-project/
      ├── client/                # Frontend React
      │   ├── src/
      │   │   ├── assets/         # Images, icônes, etc.
      │   │   ├── components/     # Composants réutilisables
      │   │   ├── pages/          # Pages principales (routes)
      │   │   ├── slices/         # Redux slices
      │   │   ├── middelWares/    # Middlewares Redux (ou autres)
      │   │   ├── modells/        # Types et modèles TypeScript
      │   │   ├── store/          # Configuration du store Redux
      │   │   ├── App.tsx         # Routing principal
      │   │   └── main.tsx        # Point d'entrée React
      │   ├── index.html
      │   └── vite.config.ts      # Configuration Vite
      │
      ├── server/                # Backend Node.js / Express
          ├── src/             # Définition des routes API
               ├── dist/ 
               ├── routes/ 
               └── index.ts            
    

## ⚠️ Notes

    Le projet stocke les données dans Redux localement (pas de base de données backend).

    Si vous clonez et ne voyez pas de questions ou d'événements, vous pouvez en créer directement via l'interface.

## 📦 Build (optionnel)

Pour générer les fichiers de production :

      npm run build

### Projet réalisé par Barkouk Ilyass

