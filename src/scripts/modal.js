
export const setupModal = () => {
    const modalTrigger = document.querySelector('.how-to-link');
    modalTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.getElementById('modal');
        modal.classList.toggle('open');
        const modalCloses = document.querySelectorAll('.modal-exit')
        modalCloses.forEach((close) => {
            close.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('open');
            })
        })
    })
}