import "./styles/index.scss";
import {setupModal} from './scripts/modal';
import {initialBackground} from './scripts/background'


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    initialBackground(canvas, ctx);
    setupModal();
   
})