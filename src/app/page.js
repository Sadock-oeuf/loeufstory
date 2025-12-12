"use client"
import { useState, useEffect } from "react"


    // Icônes simples en SVG
    const Icons = {
      Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
      X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
      Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
      Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
      Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
      Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
      Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
      LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
      Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
      EyeOff: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
      ChefHat: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>
    };

    // DONNÉES INITIALES DU MENU
    const initialMenuData = {
      casseroles: {
        title: "Les Casseroles",
        description: "Servies avec pommes de terre et sauce hollandaise",
        items: [
          { id: 1, name: "Légumes", price: 17.95, description: "Épinards, poivrons, oignons, asperges, champignons, tomates, sauce hollandaise, un œuf et fromage suisse gratiné." },
          { id: 2, name: "Casserole du Chef", price: 17.95, description: "Saucisse, jambon, bacon, tomates et champignons, sauce hollandaise, un œuf et fromage suisse gratiné." },
          { id: 3, name: "Casserole Portobello", price: 20.95, description: "Saucisse, jambon, bacon, tomates et champignons portobello, sauce hollandaise, un œuf et fromage brie." },
          { id: 4, name: "Méditerranéenne", price: 17.95, description: "Saucisse, pesto basilic, tomates, oignons, olives noires, fromage feta." },
          { id: 5, name: "La Cabane de Brunch", price: 17.95, description: "Poivrons, oignons, fèves au lard, sirop d'érable, jambon, sauce hollandaise et fromage suisse." },
          { id: 6, name: "Casserole de Luxe", price: 20.95, description: "Bacon, jambon, saucisse et trois fromages, sauce hollandaise, un œuf et fromage suisse." },
          { id: 7, name: "Viande fumée", price: 18.95, description: "Viande fumée, pommes de terre, sauce hollandaise, un œuf et fromage suisse." },
          { id: 8, name: "Le Gourmand", price: 17.95, description: "Poivrons, tomates, oignons, champignons, épinards, bacon, jambon, saucisse, fromage suisse gratiné." },
          { id: 9, name: "Casserole Mexicaine", price: 20.95, description: "Steak Philly, oignons, poivrons, avocat, sauce hollandaise, un œuf et fromage cheddar." }
        ]
      },
      crepes: {
        title: "Les Crêpes",
        description: "Choix de mélange: nature, blé, sarrasin. Servies avec crème pâtissière.",
        items: [
          { id: 10, name: "Nature", price: 13.95, description: "Crêpe nature avec crème pâtissière." },
          { id: 11, name: "Avec fruits mélangés", price: 16.95, description: "Crêpe avec fruits mélangés et crème pâtissière." },
          { id: 12, name: "Fraises ou bleuets ou framboises", price: 17.95, description: "Crêpe avec choix de fruits et crème pâtissière." },
          { id: 13, name: "Crêpe Arc-en-Ciel", price: 21.95, description: "Fraises, bleuets, kiwis, ananas et trois coulis." },
          { id: 14, name: "Fraises et bananes", price: 17.50, description: "Crêpe avec fraises et bananes." },
          { id: 15, name: "Fraises, bananes et chocolat noisette", price: 19.95, description: "Crêpe avec fraises, bananes et chocolat noisette." },
          { id: 16, name: "Crêpe Pistachio", price: 21.95, description: "Avec framboises, pistaches et crème pistache au chocolat." },
          { id: 17, name: "Crêpe Suprême", price: 21.95, description: "Fraises, bananes, pistache et crème de pistache au chocolat." },
          { id: 18, name: "Crêpe aux fruits des champs", price: 19.95, description: "Fraises, bananes, framboises et bleuets." }
        ]
      },
      gaufres: {
        title: "Les Gaufres",
        description: "Servies avec crème anglaise",
        items: [
          { id: 29, name: "Nature", price: 13.95, description: "Gaufre nature avec crème anglaise." },
          { id: 30, name: "Avec fruits mélangés", price: 16.95, description: "Gaufre avec fruits mélangés." },
          { id: 31, name: "Fraises ou bleuets ou framboises", price: 17.95, description: "Gaufre avec choix de fruits." },
          { id: 32, name: "Fraises et bananes", price: 17.50, description: "Gaufre avec fraises et bananes." },
          { id: 33, name: "Pommes chaudes bacon caramel", price: 18.95, description: "Pommes chaudes, bacon, fromage cheddar et caramel." },
          { id: 34, name: "Gaufre Pistachio", price: 21.95, description: "Framboises, pistaches et crème pistache au chocolat." },
          { id: 35, name: "Gaufre Suprême", price: 21.95, description: "Fraises, bananes, pistache et crème de pistache au chocolat." }
        ]
      },
      benedictine: {
        title: "Les Œufs Bénédictine",
        description: "Servis sur muffin anglais avec sauce hollandaise",
        items: [
          { id: 52, name: "Bénédictine Classique", price: 19.50, description: "Deux œufs pochés avec jambon et fromage suisse, sauce hollandaise." },
          { id: 53, name: "Florentine", price: 18.95, description: "Deux œufs pochés avec épinards et fromage cheddar, sauce hollandaise." },
          { id: 54, name: "Bénédictine Portobello", price: 20.95, description: "Deux œufs pochés avec champignon portobello et fromage brie." },
          { id: 55, name: "Bénédictine Avocat de Luxe", price: 19.95, description: "Deux œufs pochés avec bacon, avocat et fromage cheddar." },
          { id: 57, name: "Viande fumée", price: 19.95, description: "Deux œufs pochés avec viande fumée et fromage suisse." },
          { id: 58, name: "Steak Philly", price: 19.95, description: "Deux œufs pochés avec steak philly et fromage suisse." },
          { id: 59, name: "Croquette de Crabe", price: 20.95, description: "Deux œufs pochés avec croquette de crabe et fromage suisse." },
          { id: 60, name: "Le Norvégien", price: 20.95, description: "Deux œufs pochés avec saumon fumé, câpres et oignon rouge." },
          { id: 61, name: "Bénédictine Sucré", price: 21.95, description: "Un œuf, jambon et fromage suisse, servi avec pancake/crêpe, fraises, bananes et chocolat." }
        ]
      },
      omelettes: {
        title: "Les Omelettes",
        description: "Omelettes fraîches préparées à la commande",
        items: [
          { id: 62, name: "Nature", price: 12.95, description: "Omelette nature." },
          { id: 63, name: "Fromage", price: 13.95, description: "Omelette au fromage." },
          { id: 64, name: "Champignons et suisse", price: 14.95, description: "Omelette aux champignons et fromage suisse." },
          { id: 65, name: "Épinards et cheddar", price: 16.95, description: "Omelette aux épinards et fromage cheddar." },
          { id: 66, name: "Bacon ou saucisse", price: 17.75, description: "Omelette au bacon ou saucisse et fromage cheddar." },
          { id: 67, name: "Jambon et suisse", price: 17.75, description: "Omelette au jambon et fromage suisse." },
          { id: 69, name: "Western", price: 16.75, description: "Jambon, poivrons rouges et verts, oignons." },
          { id: 70, name: "Eastern", price: 16.75, description: "Bacon, tomates et oignons." },
          { id: 71, name: "Végétarienne", price: 16.95, description: "Épinards, tomates, champignons, poivrons." },
          { id: 73, name: "Grecque", price: 17.75, description: "Saucisse, tomates, olives noires et fromage feta." },
          { id: 75, name: "La Boucherie du Brunch", price: 18.95, description: "Bacon, jambon, saucisse et fromage cheddar." },
          { id: 76, name: "La Fumée du Lac", price: 20.95, description: "Viande fumée et fromage suisse." },
          { id: 78, name: "Atlantique", price: 21.95, description: "Saumon fumé, oignons, câpres et fromage à la crème." }
        ]
      },
      sectionOeufs: {
        title: "Section Œufs",
        description: "Servis avec patates déjeuner et fruits",
        items: [
          { id: 134, name: "Un œuf", price: 8.95, description: "Un œuf avec patates déjeuner." },
          { id: 135, name: "Un œuf + viande", price: 10.95, description: "Un œuf avec choix de viande et patates." },
          { id: 136, name: "Deux œufs", price: 9.45, description: "Deux œufs avec patates déjeuner." },
          { id: 137, name: "Deux œufs + viande", price: 12.95, description: "Deux œufs avec choix de viande." },
          { id: 138, name: "Deux œufs + trois viandes", price: 16.95, description: "Deux œufs avec bacon, jambon et saucisse." },
          { id: 139, name: "Le Matin Doux", price: 15.95, description: "Deux œufs, choix de viande, et fèves au lard ou creton." },
          { id: 140, name: "Le Classique", price: 16.95, description: "Deux œufs, choix de viande, fèves au lard et creton." },
          { id: 141, name: "Le Souvenir", price: 17.95, description: "Deux œufs, viande, fèves et creton, avec pancake, crêpe ou pain doré." },
          { id: 142, name: "Coco Choco", price: 20.95, description: "Deux œufs, choix de viande, et ½ gaufre fraises, bananes et chocolat noisette." },
          { id: 143, name: "L'Expérience", price: 19.95, description: "Deux œufs, bacon, jambon, saucisse, fèves au lard et creton." },
          { id: 144, name: "Le Gourmand Brunch", price: 21.25, description: "Deux œufs, bacon, jambon, saucisse, fèves et creton, avec 1 crêpe et 1 pain doré." },
          { id: 145, name: "Déjeuner Santé", price: 18.95, description: "Bol de fruits, fromage cottage, un œuf poché, bagel et fromage à la crème." }
        ]
      },
      poutines: {
        title: "Les Poutines Déjeuner",
        description: "Poutines pour le brunch",
        items: [
          { id: 110, name: "Le Classique", price: 16.95, description: "Sauce hollandaise, fromage en grains et un œuf." },
          { id: 111, name: "Trois Viandes", price: 18.95, description: "Jambon, bacon, saucisse, sauce hollandaise, fromage en grains et un œuf." },
          { id: 112, name: "Viande fumée", price: 19.95, description: "Viande fumée, cornichons, sauce hollandaise, fromage en grains, un œuf et moutarde." },
          { id: 113, name: "Steak Philly", price: 19.95, description: "Steak Philly, oignons, sauce hollandaise, fromage en grains et un œuf." }
        ]
      },
      grilledCheese: {
        title: "Les Grilled Cheese",
        description: "Sandwichs grillés gourmands",
        items: [
          { id: 46, name: "Viande fumée", price: 18.95, description: "Fromage mozzarella, viande fumée et cornichon." },
          { id: 47, name: "Grilled Cheese Bacon", price: 17.95, description: "Fromage jaune et 6 tranches de bacon." },
          { id: 48, name: "Grilled Cheese Matin", price: 15.95, description: "Œuf crevé, jambon et fromage jaune." },
          { id: 49, name: "Steak Philly", price: 18.75, description: "Steak Philly et fromage suisse." },
          { id: 50, name: "Pomme et Jambon", price: 17.95, description: "Pomme, jambon et fromage cheddar." },
          { id: 51, name: "Portobello", price: 17.95, description: "Champignons portobello et fromage brie." }
        ]
      },
      salades: {
        title: "Les Salades & Midis",
        description: "Fraîches et légères",
        items: [
          { id: 114, name: "Salade L'Oeufstory", price: 19.95, description: "Avocat, œuf, tomates, concombres, oignons rouges et vinaigrette maison." },
          { id: 115, name: "Salade L'Oeufstory avec poulet", price: 21.95, description: "Salade L'Oeufstory avec poulet grillé." },
          { id: 116, name: "Salade de thon", price: 16.25, description: "Thon, tomates, concombres, oignons rouges et vinaigrette maison." },
          { id: 119, name: "Salade César", price: 14.95, description: "Salade César classique." },
          { id: 120, name: "Salade César avec poulet", price: 18.95, description: "Salade César avec poulet grillé." },
          { id: 121, name: "Salade saumon fumé", price: 22.75, description: "Saumon fumé, câpres, oignons rouges, fruits, bagel et fromage à la crème." },
          { id: 122, name: "Burger", price: 18.30, description: "Laitue, tomates, cornichons, oignons, ketchup et moutarde. Servi avec frites et salade." },
          { id: 123, name: "Cheeseburger bacon", price: 18.95, description: "Laitue, tomates, cornichons, oignons, ketchup, moutarde et fromage jaune." },
          { id: 124, name: "Burger de poulet croustillant", price: 19.95, description: "Poulet croustillant, tomates, cornichons, oignons et mayonnaise." }
        ]
      },
      sandwichs: {
        title: "Les Sandwichs",
        description: "Avec 2 accompagnements au choix",
        items: [
          { id: 126, name: "Boolt", price: 16.95, description: "Bacon, œuf, laitue et mayonnaise avec fromage jaune sur un bagel." },
          { id: 127, name: "Croque-Monsieur", price: 15.95, description: "Jambon, fromage suisse, tomates et œuf battu." },
          { id: 128, name: "Club L'Oeufstory", price: 16.95, description: "Laitue, tomates, bacon, œuf crevé et fromage jaune." },
          { id: 129, name: "Croque-Thon", price: 16.95, description: "Thon, mayonnaise, oignons verts et fromage suisse." },
          { id: 130, name: "Club Sandwich", price: 18.95, description: "Club sandwich classique." },
          { id: 131, name: "Croque-Madame", price: 17.95, description: "Poulet, fromage suisse, tomates et œuf battu." },
          { id: 132, name: "Wrap L'Oeufstory", price: 17.95, description: "Bacon, avocat, tomates, poivrons et fromage suisse." },
          { id: 133, name: "Wrap Western", price: 16.95, description: "Jambon, poivrons, oignons et fromage suisse." }
        ]
      }
    };

    // COMPOSANT PRINCIPAL
    function LOeufstoryApp() {
      const [currentPage, setCurrentPage] = useState('home');
      const [menuData, setMenuData] = useState(initialMenuData);
      const [reservations, setReservations] = useState([]);
      const [isAdmin, setIsAdmin] = useState(false);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState('casseroles');

      // Charger les réservations depuis l'API
      useEffect(() => {
        fetch('/api/reservations')
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) setReservations(data);
          })
          .catch(err => console.error('Erreur chargement réservations:', err));
      }, []);

      const renderPage = () => {
        switch(currentPage) {
          case 'menu': return <MenuPage menuData={menuData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
          case 'reservation': return <ReservationPage reservations={reservations} setReservations={setReservations} />;
          case 'admin': return isAdmin ? <AdminPage menuData={menuData} setMenuData={setMenuData} reservations={reservations} setReservations={setReservations} setIsAdmin={setIsAdmin} /> : <LoginPage setIsAdmin={setIsAdmin} />;
          default: return <HomePage setCurrentPage={setCurrentPage} />;
        }
      };

      return (
        <div className="min-h-screen bg-stone-100">
          {/* Header */}
          <header className="bg-black text-amber-50 shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
                  <img src="/logo.png" alt="L'Oeufstory" className="h-16 md:h-20 group-hover:scale-105 transition-transform" />
                </div>

                <nav className="hidden md:flex items-center gap-1">
                  {[
                    { key: 'home', label: 'Accueil' },
                    { key: 'menu', label: 'Menu' },
                    { key: 'reservation', label: 'Réservation' },
                    { key: 'admin', label: 'Admin', hasIcon: true }
                  ].map(item => (
                    <button
                      key={item.key}
                      onClick={() => setCurrentPage(item.key)}
                      className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                        currentPage === item.key 
                          ? 'bg-yellow-600 text-black shadow-inner' 
                          : 'hover:bg-gray-800 text-yellow-500'
                      }`}
                    >
                      {item.hasIcon && <Icons.Settings />}
                      {item.label}
                    </button>
                  ))}
                </nav>

                <button 
                  className="md:hidden p-2 hover:bg-amber-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
                </button>
              </div>

              {mobileMenuOpen && (
                <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 space-y-2">
                  {['home', 'menu', 'reservation', 'admin'].map(key => (
                    <button
                      key={key}
                      onClick={() => { setCurrentPage(key); setMobileMenuOpen(false); }}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        currentPage === key ? 'bg-yellow-600 text-black' : 'hover:bg-gray-800 text-yellow-500'
                      }`}
                    >
                      {key === 'home' ? 'Accueil' : key === 'menu' ? 'Menu' : key === 'reservation' ? 'Réservation' : 'Admin'}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </header>

          <main className="min-h-screen">{renderPage()}</main>

          <footer className="bg-black text-amber-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-500">L'Oeufstory</h3>
                  <p className="text-gray-300">Votre destination brunch au Québec. Des œufs parfaits, des sourires garantis.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-500">Horaires</h3>
                  <div className="space-y-1 text-gray-300">
                    <p>Lundi - Vendredi: 7h - 15h</p>
                    <p>Samedi - Dimanche: 7h - 16h</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-500">Contact</h3>
                  <div className="space-y-2 text-gray-300">
                    <p className="flex items-center gap-2"><Icons.MapPin /> 123 Rue du Brunch, Québec</p>
                    <p className="flex items-center gap-2"><Icons.Phone /> (514) 555-OEUF</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-yellow-600">
                © 2025 L'Oeufstory. Tous droits réservés.
              </div>
            </div>
          </footer>
        </div>
      );
    }

    // PAGE D'ACCUEIL
    function HomePage({ setCurrentPage }) {
      return (
        <div>
          <section className="relative bg-black text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-9xl">🍳</div>
              <div className="absolute bottom-10 right-10 text-9xl">🥞</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-10">🥐</div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Bienvenue chez<br/>
                  <span className="text-yellow-500">L'Oeufstory</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  L'art du petit-déjeuner parfait, servi avec passion depuis des années.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setCurrentPage('menu')}
                    className="px-8 py-4 bg-yellow-600 text-black rounded-full font-bold text-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-xl"
                  >
                    Découvrir le Menu
                  </button>
                  <button 
                    onClick={() => setCurrentPage('reservation')}
                    className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all"
                  >
                    Réserver une Table
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-100 to-transparent"></div>
          </section>

          <section className="py-20 bg-stone-100">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Pourquoi L'Oeufstory?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: "🥚", title: "Œufs Parfaits", desc: "Pochés, brouillés, bénédictine... nous maîtrisons l'art de l'œuf sous toutes ses formes." },
                  { icon: "🍁", title: "100% Québécois", desc: "Produits locaux, sirop d'érable authentique et saveurs de chez nous." },
                  { icon: "👨‍🍳", title: "Fait Maison", desc: "Sauces hollandaise, crêpes et pains dorés préparés frais chaque matin." }
                ].map((feature, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group border border-stone-200">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center text-amber-900 mb-4">Nos Classiques</h2>
              <p className="text-center text-amber-600 mb-12 text-lg">Les favoris de nos clients</p>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: "Bénédictine Classique", price: "19,50$", emoji: "🍳" },
                  { name: "Crêpe Suprême", price: "21,95$", emoji: "🥞" },
                  { name: "Poutine Déjeuner", price: "16,95$", emoji: "🍟" },
                  { name: "Le Gourmand Brunch", price: "21,25$", emoji: "🍽️" }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-6 text-center hover:scale-105 transition-transform cursor-pointer shadow-md">
                    <div className="text-5xl mb-4">{item.emoji}</div>
                    <h3 className="font-bold text-amber-900 mb-2">{item.name}</h3>
                    <p className="text-amber-600 font-semibold">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <button onClick={() => setCurrentPage('menu')} className="text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-4">
                  Voir tout le menu →
                </button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-br from-amber-100 to-orange-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-amber-900 mb-6">Venez nous voir!</h2>
                  <div className="space-y-4 text-amber-800">
                    <p className="flex items-center gap-3"><Icons.MapPin /> 123 Rue du Brunch, Québec, QC</p>
                    <p className="flex items-center gap-3"><Icons.Phone /> (514) 555-OEUF</p>
                    <p className="flex items-center gap-3"><Icons.Clock /> Lun-Ven: 7h-15h | Sam-Dim: 7h-16h</p>
                  </div>
                </div>
                <div className="bg-amber-900 rounded-2xl p-8 text-amber-50 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">Réservez votre table</h3>
                  <p className="text-amber-200 mb-6">Évitez l'attente, réservez en ligne en quelques clics!</p>
                  <button 
                    onClick={() => setCurrentPage('reservation')}
                    className="w-full py-3 bg-amber-400 text-amber-900 rounded-full font-bold hover:bg-amber-300 transition-colors"
                  >
                    Réserver maintenant
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // PAGE MENU
    function MenuPage({ menuData, selectedCategory, setSelectedCategory }) {
      const categories = Object.keys(menuData);
      
      return (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 text-center mb-4">Notre Menu</h1>
            <p className="text-center text-amber-600 mb-10">Découvrez toutes nos délicieuses créations</p>

            <div className="mb-10 overflow-x-auto pb-4">
              <div className="flex gap-2 min-w-max px-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all text-sm ${
                      selectedCategory === cat 
                        ? 'bg-amber-600 text-white shadow-lg' 
                        : 'bg-white text-amber-700 hover:bg-amber-100 shadow'
                    }`}
                  >
                    {menuData[cat].title}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
              <div className="border-b-2 border-amber-200 pb-4 mb-8">
                <h2 className="text-3xl font-bold text-amber-900">{menuData[selectedCategory].title}</h2>
                <p className="text-amber-600 mt-2">{menuData[selectedCategory].description}</p>
              </div>

              <div className="grid gap-6">
                {menuData[selectedCategory].items.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4 pb-4 border-b border-amber-100 last:border-0 hover:bg-amber-50 rounded-lg p-3 -mx-3 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-amber-900 text-lg">{item.name}</h3>
                      <p className="text-amber-600 text-sm mt-1">{item.description}</p>
                    </div>
                    <span className="text-xl font-bold text-amber-700">{item.price.toFixed(2)}$</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // PAGE RÉSERVATION
    function ReservationPage({ reservations, setReservations }) {
      const [formData, setFormData] = useState({
        name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: ''
      });
      const [submitted, setSubmitted] = useState(false);
      const [confirmationCode, setConfirmationCode] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          const newReservation = await response.json();
          setReservations([...reservations, newReservation]);
          setConfirmationCode(newReservation.code);
          setSubmitted(true);
        } catch (error) {
          console.error('Erreur création réservation:', error);
          alert('Erreur lors de la réservation. Veuillez réessayer.');
        }
      };

      if (submitted) {
        return (
          <div className="py-20">
            <div className="max-w-xl mx-auto px-4 text-center">
              <div className="bg-white rounded-2xl shadow-xl p-10">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-3xl font-bold text-amber-900 mb-4">Réservation Confirmée!</h2>
                <p className="text-amber-600 mb-6">Merci {formData.name}, votre table est réservée.</p>
                <div className="bg-amber-100 rounded-xl p-6 mb-6">
                  <p className="text-sm text-amber-600 mb-2">Code de confirmation:</p>
                  <p className="text-2xl font-bold text-amber-900">{confirmationCode}</p>
                </div>
                <div className="text-left bg-amber-50 rounded-xl p-6 space-y-2 text-amber-800">
                  <p><strong>Date:</strong> {formData.date}</p>
                  <p><strong>Heure:</strong> {formData.time}</p>
                  <p><strong>Personnes:</strong> {formData.guests}</p>
                </div>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' }); }}
                  className="mt-8 px-6 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-colors"
                >
                  Nouvelle réservation
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="py-12">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 text-center mb-4">Réserver une Table</h1>
            <p className="text-center text-amber-600 mb-10">Réservez votre place pour un délicieux brunch</p>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-800 font-medium mb-2">Nom complet *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors" placeholder="Jean Tremblay"/>
                </div>
                <div>
                  <label className="block text-amber-800 font-medium mb-2">Téléphone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors" placeholder="(514) 555-1234"/>
                </div>
                <div>
                  <label className="block text-amber-800 font-medium mb-2">Courriel *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors" placeholder="jean@exemple.com"/>
                </div>
                <div>
                  <label className="block text-amber-800 font-medium mb-2">Nombre de personnes *</label>
                  <select required value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors bg-white">
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'personne' : 'personnes'}</option>)}
                    <option value="10+">Plus de 10 (groupe)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-amber-800 font-medium mb-2">Date *</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors"/>
                </div>
                <div>
                  <label className="block text-amber-800 font-medium mb-2">Heure *</label>
                  <select required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors bg-white">
                    <option value="">Choisir une heure</option>
                    {['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'].map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-amber-800 font-medium mb-2">Notes spéciales</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors resize-none" rows="3" placeholder="Allergies, occasion spéciale, chaise haute pour enfant..."/>
              </div>

              <button type="submit" className="w-full mt-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl">
                Confirmer la réservation
              </button>
            </form>
          </div>
        </div>
      );
    }

    // PAGE LOGIN
    function LoginPage({ setIsAdmin }) {
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [showPassword, setShowPassword] = useState(false);

      const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
          setIsAdmin(true);
        } else {
          setError('Mot de passe incorrect');
        }
      };

      return (
        <div className="py-20">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Settings />
                </div>
                <h2 className="text-2xl font-bold text-amber-900">Administration</h2>
                <p className="text-amber-600 mt-2">Connectez-vous pour gérer le restaurant</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-colors pr-12" placeholder="Mot de passe"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600">
                    {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                  </button>
                </div>
                
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                
                <button type="submit" className="w-full mt-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors">
                  Se connecter
                </button>
              </form>

              <p className="text-center text-amber-400 text-sm mt-6">Mot de passe démo: admin123</p>
            </div>
          </div>
        </div>
      );
    }

    // PAGE ADMIN
    function AdminPage({ menuData, setMenuData, reservations, setReservations, setIsAdmin }) {
      const [activeTab, setActiveTab] = useState('reservations');
      const [editingCategory, setEditingCategory] = useState(null);
      const [editingItem, setEditingItem] = useState(null);
      const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });

      const handleDeleteReservation = async (id) => {
        if (confirm('Supprimer cette réservation?')) {
          try {
            await fetch(`/api/reservations?id=${id}`, { method: 'DELETE' });
            setReservations(reservations.filter(r => r.id !== id));
          } catch (error) {
            console.error('Erreur suppression:', error);
          }
        }
      };

      const handleUpdateReservationStatus = async (id, status) => {
        try {
          const reservation = reservations.find(r => r.id === id);
          await fetch('/api/reservations', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...reservation, status })
          });
          setReservations(reservations.map(r => r.id === id ? {...r, status} : r));
        } catch (error) {
          console.error('Erreur mise à jour:', error);
        }
      };

      const handleAddMenuItem = (category) => {
        if (!newItem.name || !newItem.price) return;
        const newId = Math.max(...Object.values(menuData).flatMap(c => c.items.map(i => i.id))) + 1;
        setMenuData({
          ...menuData,
          [category]: {
            ...menuData[category],
            items: [...menuData[category].items, { id: newId, name: newItem.name, price: parseFloat(newItem.price), description: newItem.description }]
          }
        });
        setNewItem({ name: '', price: '', description: '' });
      };

      const handleDeleteMenuItem = (category, itemId) => {
        if (confirm('Supprimer cet item du menu?')) {
          setMenuData({
            ...menuData,
            [category]: { ...menuData[category], items: menuData[category].items.filter(i => i.id !== itemId) }
          });
        }
      };

      const handleUpdateMenuItem = (category, itemId, updates) => {
        setMenuData({
          ...menuData,
          [category]: { ...menuData[category], items: menuData[category].items.map(i => i.id === itemId ? {...i, ...updates} : i) }
        });
      };

      return (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-amber-900">Console d'Administration</h1>
                <p className="text-amber-600">Gérez votre menu et vos réservations</p>
              </div>
              <button onClick={() => setIsAdmin(false)} className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                <Icons.LogOut /> Déconnexion
              </button>
            </div>

            <div className="flex gap-2 mb-8">
              <button onClick={() => setActiveTab('reservations')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'reservations' ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-amber-700 hover:bg-amber-100'}`}>
                <Icons.Calendar /> Réservations
              </button>
              <button onClick={() => setActiveTab('menu')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'menu' ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-amber-700 hover:bg-amber-100'}`}>
                <Icons.ChefHat /> Gestion du Menu
              </button>
            </div>

            {activeTab === 'reservations' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">Réservations ({reservations.length})</h2>
                
                {reservations.length === 0 ? (
                  <p className="text-amber-500 text-center py-10">Aucune réservation pour le moment</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-amber-200">
                          <th className="text-left py-3 px-4 text-amber-800">Code</th>
                          <th className="text-left py-3 px-4 text-amber-800">Client</th>
                          <th className="text-left py-3 px-4 text-amber-800">Date/Heure</th>
                          <th className="text-left py-3 px-4 text-amber-800">Personnes</th>
                          <th className="text-left py-3 px-4 text-amber-800">Statut</th>
                          <th className="text-left py-3 px-4 text-amber-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(res => (
                          <tr key={res.id} className="border-b border-amber-100 hover:bg-amber-50">
                            <td className="py-3 px-4 font-mono text-sm">{res.code}</td>
                            <td className="py-3 px-4">
                              <div className="font-medium">{res.name}</div>
                              <div className="text-sm text-amber-500">{res.phone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{res.date}</div>
                              <div className="text-sm text-amber-500">{res.time}</div>
                            </td>
                            <td className="py-3 px-4">{res.guests}</td>
                            <td className="py-3 px-4">
                              <select value={res.status} onChange={(e) => handleUpdateReservationStatus(res.id, e.target.value)} className={`px-3 py-1 rounded-full text-sm font-medium ${res.status === 'confirmée' ? 'bg-green-100 text-green-700' : res.status === 'annulée' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                <option value="confirmée">Confirmée</option>
                                <option value="en attente">En attente</option>
                                <option value="annulée">Annulée</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleDeleteReservation(res.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                                <Icons.Trash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-amber-900 mb-4">Sélectionner une catégorie</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {Object.keys(menuData).map(cat => (
                      <button key={cat} onClick={() => setEditingCategory(editingCategory === cat ? null : cat)} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${editingCategory === cat ? 'bg-amber-600 text-white shadow-lg' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}>
                        {menuData[cat].title}
                      </button>
                    ))}
                  </div>
                </div>

                {editingCategory && (
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-amber-900">{menuData[editingCategory].title}</h3>
                      <span className="text-amber-500">{menuData[editingCategory].items.length} items</span>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <Icons.Plus /> Ajouter un nouvel item
                      </h4>
                      <div className="grid md:grid-cols-4 gap-3">
                        <input type="text" placeholder="Nom" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-500 focus:outline-none"/>
                        <input type="number" step="0.01" placeholder="Prix" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-500 focus:outline-none"/>
                        <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} className="px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-500 focus:outline-none md:col-span-2"/>
                      </div>
                      <button onClick={() => handleAddMenuItem(editingCategory)} className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">
                        <Icons.Plus /> Ajouter
                      </button>
                    </div>

                    <div className="space-y-3">
                      {menuData[editingCategory].items.map(item => (
                        <div key={item.id} className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                          {editingItem === item.id ? (
                            <>
                              <div className="flex-1 grid md:grid-cols-3 gap-3">
                                <input type="text" value={item.name} onChange={(e) => handleUpdateMenuItem(editingCategory, item.id, { name: e.target.value })} className="px-3 py-2 rounded-lg border border-amber-200"/>
                                <input type="number" step="0.01" value={item.price} onChange={(e) => handleUpdateMenuItem(editingCategory, item.id, { price: parseFloat(e.target.value) })} className="px-3 py-2 rounded-lg border border-amber-200"/>
                                <input type="text" value={item.description} onChange={(e) => handleUpdateMenuItem(editingCategory, item.id, { description: e.target.value })} className="px-3 py-2 rounded-lg border border-amber-200"/>
                              </div>
                              <button onClick={() => setEditingItem(null)} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                <Icons.Save />
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-semibold text-amber-900">{item.name}</h4>
                                  <span className="font-bold text-amber-700">{item.price.toFixed(2)}$</span>
                                </div>
                                <p className="text-sm text-amber-600 mt-1">{item.description}</p>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => setEditingItem(item.id)} className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors">
                                  <Icons.Edit />
                                </button>
                                <button onClick={() => handleDeleteMenuItem(editingCategory, item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                                  <Icons.Trash />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    export default LOeufstoryApp;
