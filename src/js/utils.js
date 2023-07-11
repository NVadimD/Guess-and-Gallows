export const darkModeHandle = () => {
    const htmlElement = document.querySelector('html');
    const darkModeSwitcher = document.getElementById('toggleDarkMode');

    if (localStorage.getItem('mode') === 'dark') {
        htmlElement.classList.add('dark');
        darkModeSwitcher.checked = true;
    }
    
    darkModeSwitcher.addEventListener('change', function() {
        htmlElement.classList.toggle('dark');
    
        if(htmlElement.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark')
        } else {
            localStorage.setItem('mode', 'light')
        }
    })
}